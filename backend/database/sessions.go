package database

import (
	"backend/models"
	"log"
	"time"

	"github.com/google/uuid"
)

func (db *DB) CreateSession(ctx *models.HandlerContext) (*models.Session, error) {
	session := &models.Session{
		UserID:     ctx.UserId,
		Expiry:     time.Now().Add(120 * time.Hour),
		Token:      uuid.NewString(),
		IP:         ctx.IP,
		UserAgent:  ctx.UserAgent,
		DeviceInfo: ctx.DeviceInfo,
		LastActive: ctx.SessionLastActive,
	}

	log.Printf("Session: %+v", session)
	if err := db.Conn.Create(session).Error; err != nil {
		log.Fatal("Could not create session")
		return nil, err
	}
	return session, nil
}

func (db *DB) RemoveSession(ctx string) error { // String value over Cookie
	var session models.Session
	return db.Conn.Where("token = ?", ctx).Delete(session).Error
}

func (db *DB) RemoveAllSessions(ctx_id uint) error {
	var session models.Session
	return db.Conn.Where("user_id = ?", ctx_id).Delete(&session).Error
}

func (db *DB) GetSession(ctx string) (*models.Session, error) {
	var session *models.Session
	if err := db.Conn.Where("token = ?", ctx).First(&session).Error; err != nil {
		return nil, err
	}
	return session, nil
}

func (db *DB) GetUserSessions(ctx uint) ([]models.Session, error) {
	var sessions []models.Session
	if err := db.Conn.Where("user_id = ? ", ctx).Find(&sessions).Error; err != nil {
		return nil, err
	}
	return sessions, nil
}

func (db *DB) UpdateSessionLastActive(ctx time.Time) error {
	return db.Conn.Model(&models.Session{}).Where("token = ?", ctx).Update("last_active", time.Now()).Error
}
