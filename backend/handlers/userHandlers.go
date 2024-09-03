package handlers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"
)

func (srv *Server) registerUserRoutes() {
	srv.Mux.HandleFunc("POST /api/register", srv.register)
	srv.Mux.HandleFunc("POST /api/login", srv.login)
	srv.Mux.HandleFunc("POST /api/logout", srv.logout)
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (srv *Server) register(w http.ResponseWriter, r *http.Request) {
	var regReq database.RegisterRequest

	// Log the content type
	log.Printf("Content-Type: %s", r.Header.Get("Content-Type"))

	err := json.NewDecoder(r.Body).Decode(&regReq)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	log.Printf("%+v", regReq)
	// Log the parsed request
	log.Printf("Parsed request: %+v", regReq)

	user, err := srv.DB.CreateUser(&regReq)
	if err != nil {
		WriteJson[any](w, http.StatusBadRequest, "Registration failed: "+err.Error())
		return
	}
	log.Printf("User created: %+v", user)

	err = WriteJson[models.User](w, http.StatusOK, user)
	if err != nil {
		log.Printf("Error writing JSON: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

func (srv *Server) login(w http.ResponseWriter, r *http.Request) {
	var userCred LoginRequest
	err := json.NewDecoder(r.Body).Decode(&userCred)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var user models.User
	username := strings.ToLower(userCred.Username)

	if err := srv.DB.Conn.Where("username = ? ", username).First(&user).Error; err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)

		return
	}

	if !user.CheckHash(userCred.Password) {
		http.Error(w, "Incorrect Password!", http.StatusUnauthorized)
		return
	}
	ctx := &models.HandlerContext{
		UserId:            user.ID,
		Username:          user.Username,
		SessionLastActive: time.Now(),
	}
	session, err := srv.DB.CreateSession(ctx)
	if err != nil {
		http.Error(w, "Error creating session", http.StatusInternalServerError)
		return
	}

	log.Printf("Session created : %v", session)

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    session.Token,
		Expires:  session.Expiry,
		HttpOnly: true,
		Path:     "/",
	})
	WriteJson[any](w, http.StatusOK, map[string]string{"message": "login successful"})
}

func (srv *Server) logout(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context().Value(SessionCtx).(*models.HandlerContext)
	if err := srv.DB.RemoveSession(ctx.Token); err != nil {
		http.Error(w, "Log-Out unsuccessful", http.StatusInternalServerError)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    "",
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		Path:     "/",
	})
	WriteJson[any](w, http.StatusOK, map[string]string{"message": "logged out successfully"})
}
