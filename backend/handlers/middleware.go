package handlers

import (
	"backend/models"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// MiddleWare
// ======================================================================================
type SessionKey string

func (srv *Server) registerMiddlewareRoutes() {
	srv.Mux.HandleFunc("POST /api/check-auth", srv.checkAuth)
}

const SessionCtx = SessionKey("session_ctx")

func (srv *Server) AuthMiddleWare(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Auth middleware hit:\n------- \nRequest for: %s -and-\n%s", r.Method, r.URL.Path)

		// tokenString := r.Header.Get("Authorization")
		// if tokenString == "" {
		// 	http.Error(w, "Missing authorization token", http.StatusUnauthorized)
		// 	return
		// }

		// tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		// claims, err := utilities.ValidateToken(tokenString)
		// if err != nil {
		// 	http.Error(w, "Invalid Token", http.StatusUnauthorized)
		// 	return
		// }

		cookie, err := r.Cookie("session_token")
		if err != nil {
			log.Print("Cookie not found")
			SendUnauthorizedResponse(w)
			return
		}
		log.Println("This is directly after Cookie Not Found")
		if err := cookie.Valid(); err != nil {
			log.Printf("Cookie not valid")
			SendUnauthorizedResponse(w)
			return
		}

		token := cookie.Value

		var session models.Session
		if err := srv.DB.Conn.First(&session, "token = ?", token).Error; err != nil {
			log.Printf("Session not found %v", err)
			SendUnauthorizedResponse(w)
			return
		}

		var user models.User
		if err := srv.DB.Conn.Find(&user, "id = ?", session.UserID).Error; err != nil {
			log.Fatal("Session validated, User not found")
			http.Error(w, "User not found", http.StatusInternalServerError)
			return
		}

		ip := r.RemoteAddr
		if forwardedFor := r.Header.Get("X-Forwarded-For"); forwardedFor != "" {
			ip = strings.Split(forwardedFor, ",")[0]
		}

		userAgent := r.UserAgent()
		deviceInfo := extractDeviceInfo(userAgent)

		handlerContext := models.HandlerContext{
			UserId:            user.ID,
			Username:          user.Username,
			Token:             session.Token,
			IP:                ip,
			UserAgent:         userAgent,
			DeviceInfo:        deviceInfo,
			SessionLastActive: time.Now(),
		}

		log.Printf("%v Made It past declaring handlerContext", handlerContext)

		ctx := context.WithValue(r.Context(), SessionCtx, &handlerContext)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

// logging Mid   -- TODO Make more informative?
// ======================================================================
type Log struct {
	handler http.Handler
}

func (logger *Log) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	log.Printf("Incoming request: Method: %s, URL: %s", r.Method, r.URL.Path)
	logger.handler.ServeHTTP(w, r)
	log.Printf("\nCompleted Request\nMethod: %s\nURL: %s\nTime Since: %v\nContent-Type: %s\n", r.Method, r.URL.Path, time.Since(start), r.Header.Get("Content-Type"))
}

func NewLogger(handler http.Handler) *Log {
	return &Log{handler}
}

// CORS
// ---------
func Cors(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, Accept-Encoding")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	}
}

func extractDeviceInfo(userAgent string) string {
	ua := strings.ToLower(userAgent)

	var deviceType, os, browser string

	switch {
	case strings.Contains(ua, "mobile"):
		deviceType = "Mobile"
	case strings.Contains(ua, "tablet"):
		deviceType = "Tablet"
	default:
		deviceType = "Desktop"
	}

	switch {
	case strings.Contains(ua, "windows"):
		os = "Windows"
	case strings.Contains(ua, "mac os"):
		os = "MacOS"
	case strings.Contains(ua, "linux"):
		os = "Linux"
	case strings.Contains(ua, "android"):
		os = "Android"
	case strings.Contains(ua, "ios"):
		os = "iOS"
	default:
		os = "Unknown OS"
	}

	switch {
	case strings.Contains(ua, "firefox"):
		browser = "Firefox"
	case strings.Contains(ua, "chrome"):
		browser = "Chrome"
	case strings.Contains(ua, "safari"):
		browser = "Safari"
	case strings.Contains(ua, "edge"):
		browser = "Edge"
	case strings.Contains(ua, "opera"):
		browser = "Opera"
	default:
		browser = "Unknown Browser"
	}

	return strings.Join([]string{deviceType, os, browser}, "|")
}

var (
	limiter = rate.NewLimiter(1, 3)
	mutex   sync.Mutex
)

func RateLimit(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		mutex.Lock()
		defer mutex.Unlock()

		if !limiter.Allow() {
			http.Error(w, "Too many requests", http.StatusTooManyRequests)
			return
		}
		next.ServeHTTP(w, r)
	}
}

func (srv *Server) checkAuth(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_token")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]bool{"isLoggedIn": false})
		return
	}

	session, err := srv.DB.GetSession(cookie.Value)
	if err != nil {
		WriteJson[any](w, http.StatusInternalServerError, map[string]bool{"isLoggedIn": false})
		return
	}

	if session.IsExpired() {
		WriteJson[any](w, http.StatusUnauthorized, map[string]bool{"isLoggedIn": false})
		return
	}

	WriteJson[any](w, http.StatusOK, map[string]bool{"isLoggedIn": true})
}
