package entity

type Report struct {
	ID          uint64 `gorm:"primary_key:auto_increment" json:"id"`
	Type       	string `gorm:"type:varchar(150)" json:"type" binding:"required"`
	Location    string `gorm:"type:varchar(100)" json:"location" binding:"required"`
	Description string `gorm:"type:text" json:"description"`
	Photos		string `gorm:"type:varchar(1024); default:'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg'" json:"photos"`
	UserID     	uint64 `gorm:"not null" json:"-"`
	User        User   `gorm:"foreignkey:UserID;constraint;onUpdate:CASCADE;onDelete:CASCADE" json:"user"`
}
