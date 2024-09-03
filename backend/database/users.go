package database

import (
	"backend/models"
	"errors"
	"strings"

	"golang.org/x/crypto/bcrypt"
	_ "gorm.io/gorm"
)

// Return this vs returning hashed Pass'
type NoPassUser struct {
	Username string `json:"username"`
}

type RegisterRequest struct {
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
	Username        string `json:"username"`
}

func (db *DB) CreateUser(form *RegisterRequest) (*NoPassUser, error) {
	user := models.User{Password: form.Password, Username: form.Username}
	if err := user.HashPassword(); err != nil {
		return nil, err
	}

	user.Username = strings.ToLower(user.Username)

	if err := db.Conn.Exec("INSERT INTO users (password, username) VALUES (?,?)", user.Password, user.Username).Error; err != nil {
		return nil, err
	}

	if err := db.Conn.Raw("SELECT * FROM users WHERE username = ? ", user.Username).Scan(&user).Error; err != nil {
		return nil, err
	}

	safeUser := NoPassUser{Username: form.Username}

	return &safeUser, nil
}

// Change this to email??
func (db *DB) GetUserById(id uint) (*models.User, error) {
	var user models.User
	if err := db.Conn.Select("id", "username").
		Where("id = ?", id).
		First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (db *DB) DeleteUserById(id int) error {
	result := db.Conn.Model(&models.User{}).Where("id = ?", id).Delete(&models.User{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("user not found")
	}
	return nil
}

func (db *DB) UpdateUser(user *models.User) error {
	result := db.Conn.Save(user) // Save
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (db *DB) GetUserByUsername(Username string) (*models.User, error) {
	var user models.User
	if err := db.Conn.Select("username", "password").
		Where("username = ?", Username).
		First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (db *DB) ChangeUsername(userId uint, newUsername string, password string) error {
	userFromId, err := db.GetUserById(userId)
	if err != nil {
		return errors.New("user not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userFromId.Password), []byte(password)); err != nil {
		return errors.New("invalid password")
	}

	result := db.Conn.Model(userFromId).Where("id = ?", userId).Update("username", newUsername)
	if result.Error != nil {
		return errors.New("error updating user in database")
	}
	return nil
}
