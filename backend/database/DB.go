package database

import (
	"backend/models"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Tables = []interface{}{
	&models.User{},
	&models.Session{},
}

type DB struct {
	Conn *gorm.DB
}

func NewHandle() (*DB, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
		return nil, err
	}
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatalf("DATABASE_URL environment variable is not set")
		return nil, err
	}
	conn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
		return nil, err
	}
	for _, table := range Tables {
		if err := conn.AutoMigrate(table); err != nil {
			log.Fatal("Unable to migrate table: ", table)
		}
	}
	return &DB{Conn: conn}, nil
}
