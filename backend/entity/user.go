package entity

import (
	"time"
)

type UserRole string

const (
	RoleUser      UserRole = "USER"
	RoleAdmin     UserRole = "ADMIN"
	RoleAuthority UserRole = "AUTHORITY"
)

type User struct {
	ID             uint64 `gorm:"primary_key:auto_increment" json:"id"`
	Name           string `gorm:"type:varchar(255)" json:"name"`
	Password       string `gorm:"not null" json:"password"`
	Email          string `gorm:"uniqueIndex;type:varchar(255)" json:"email"`
	ProfilePicture string `gorm:"type:varchar(1024);default:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=170667a&w=0&h=kEAA35Eaz8k8A3qAGkuY8OZxpfvn9653gDjQwDHZGPE='"  json:"profile_picture"`
	Token          string `gorm:"-" json:"token"`
	// Added role field
	Role      UserRole  `gorm:"type:varchar(255);default:'USER'" json:"role"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
