package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Password string `json:"-"`
	Username string `json:"username"`
}

func (user *User) HashPassword() error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return nil
}

func (hash *User) CheckHash(pass string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash.Password), []byte(pass)) == nil
}

func (u *User) TableName() string {
	return "users"
}
