package dto

import (
	"georeportapi/entity"
)

type UserUpdateDTO struct {
	Name           string `json:"name" form:"name" binding:"required"`
	Email          string `json:"email" form:"email" binding:"required,email"`
	Password       string `json:"password" form:"password,omitempty"`
	ProfilePicture string `json:"profile_picture" form:"profile_picture"`
}

type RegisterDTO struct {
	Name     string `json:"name" form:"name" validate:"min:1" binding:"required"`
	Email    string `json:"email" form:"email" binding:"required" validate:"email"`
	Password string `json:"password" form:"password,omitempty" validate:"min:6" binding:"required"`
}

type UserResponseDTO struct {
	ID             	uint64 `json:"id" form:"id"`
	Name           	string `json:"name" form:"name" binding:"required"`
	Email          	string `json:"email" form:"email" binding:"required,email"`
	ProfilePicture 	string `json:"profile_picture" form:"profile_picture"`
	Role      		entity.UserRole  `gorm:"type:varchar(255);default:'USER'" json:"role"`
}

type AdminChangeUserRoleDTO struct {
	ID        uint64 			`json:"id" form:"id"`
	Role      entity.UserRole  	`gorm:"type:varchar(255);default:'USER'" json:"role"`
}