package main

import (
	"backend/database"
	"backend/handlers"
	"log"
	"net/http"
)

func main() {
	db, err := database.NewHandle()
	if err != nil {
		log.Println("Error connecting to database", err)
	}

	server := handlers.NewServer(db)
	server.RegisterHandlers()
	handler := handlers.RateLimit(handlers.Cors(handlers.NewLogger(server.Mux)))

	log.Println("Server is running on port 8080")
	if err := http.ListenAndServe("0.0.0.0:8080", handler); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
