package models

import (
	"time"
)

type Session struct {
	LastActive time.Time `json:"last_active"`
	Expiry     time.Time `json:"expiry"`
	Token      string    `json:"session_token"`
	IP         string    `json:"ip"`
	UserAgent  string    `json:"user_agent"`
	DeviceInfo string    `json:"device_info"`
	UserID     uint      `json:"user_id"`
}

func (s *Session) IsExpired() bool {
	return time.Now().After(s.Expiry)
}
