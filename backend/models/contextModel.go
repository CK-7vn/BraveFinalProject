package models

import "time"

type HandlerContext struct {
	SessionLastActive time.Time `json:"session_last_active"`
	Username          string    `json:"username"`
	Token             string    `json:"token"`
	IP                string    `json:"ip"`
	UserAgent         string    `json:"user_agent"`
	DeviceInfo        string    `json:"device_info"`
	UserId            uint      `json:"user_id"`
}
