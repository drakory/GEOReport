package config

import (
	//"fmt"
	"georeportapi/entity"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func ConnectDB() {
	err := godotenv.Load()
	if os.Getenv("DB_USERNAME") == "" {
		if err != nil {
			panic("Error loading .env file")
		}
	}

	dbUser := os.Getenv("DB_USERNAME")
	dbPass := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbDatabase := os.Getenv("DB_DATABASE")

	dsn := "host=" + dbHost + " user=" + dbUser + " password=" + dbPass + " dbname=" + dbDatabase + " port=" + dbPort + " sslmode=disable"

	Db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	err = Db.AutoMigrate(&entity.User{}, &entity.Report{})
	if err != nil {
		panic("Failed to migrate database!")
	}
}

func CloseDb() {
	db, err := Db.DB()
	if err != nil {
		panic("Failed to close database!")
	}
	db.Close()
}
