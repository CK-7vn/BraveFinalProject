package handlers

import (
	"backend/database"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Server struct {
	Mux    *http.ServeMux
	DB     *database.DB
	Client *http.Client
}

func NewServer(db *database.DB) *Server {
	return &Server{
		Mux:    http.NewServeMux(),
		DB:     db,
		Client: http.DefaultClient,
	}
}

func (s *Server) RegisterHandlers() {
	s.registerUserRoutes()
}

type responseInfo[T any] struct {
	Message string `json:"message"`
	Data    []T    `json:"data"`
	Success bool   `json:"success"`
}

func WriteJson[T any](w http.ResponseWriter, status int, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	response := responseInfo[T]{
		Success: true,
		Message: "",
		Data:    nil,
	}

	if data != nil {
		switch v := data.(type) {
		case string:
			response.Success = false
			response.Message = v
		case []T:
			response.Data = v
		case T:
			response.Data = []T{v}
		case map[string]interface{}:
			jsonData, err := json.Marshal(v)
			if err != nil {
				return fmt.Errorf("error marshalling map data: %v", err)
			}
			var typedData T
			err = json.Unmarshal(jsonData, &typedData)
			if err != nil {
				return fmt.Errorf("error unmarshalling map data to T: %v", err)
			}
			response.Data = []T{typedData}
		default:
			jsonData, err := json.Marshal(data)
			if err != nil {
				return fmt.Errorf("error marshalling data: %v", err)
			}
			var typedData T
			err = json.Unmarshal(jsonData, &typedData)
			if err != nil {
				return fmt.Errorf("error unmarshalling T data: %v", err)
			}
			response.Data = []T{typedData}
		}
	}

	if data == nil {
		return nil
	}

	log.Printf("Success:%+v\n Message: %+v\n Data: %+v\n\n This directly above is the log from WriteJson", response.Success, response.Message, response.Data)

	log.Println("This is at the end of WriteJson")
	return json.NewEncoder(w).Encode(response)
}

func SendUnauthorizedResponse(w http.ResponseWriter) {
	WriteJson[any](w, http.StatusUnauthorized, "Unauthorized")
}
