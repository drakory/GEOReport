package entity

import (
	"time"
)

type Report struct {
	ID               uint64    `gorm:"primary_key:auto_increment" json:"id"`
	Type             string    `gorm:"type:varchar(150)" json:"type" binding:"required"`
	Latitude         float64   `gorm:"type:decimal(10,8)" json:"latitude"`
	Longitude        float64   `gorm:"type:decimal(11,8)" json:"longitude"`
	Description      string    `gorm:"type:text" json:"description"`
	Photos           string    `gorm:"type:varchar(1024); default:'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg'" json:"photos"`
	Status           string    `gorm:"type:varchar(150)" json:"status" default:"Pending"`
	UserID           uint64    `gorm:"not null" json:"-"`
	User             User      `gorm:"foreignkey:UserID;constraint;onUpdate:CASCADE;onDelete:CASCADE" json:"user"`
	CreatedAt        time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt        time.Time `gorm:"autoUpdateTime" json:"updated_at"`
	AuthorityComment string    `gorm:"type:text" json:"authoritycomment"`
}
