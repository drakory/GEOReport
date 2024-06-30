package entity

type Authority struct {
	ID     uint64 `gorm:"primary_key:auto_increment" json:"id"`
	UserID uint64 `gorm:"not null" json:"-"`
	User   User   `gorm:"foreignkey:UserID;constraint;onUpdate:CASCADE;onDelete:CASCADE" json:"user"`
}

// maybe we can add a area of wich the authority is responsible for
// so they only see the reports of their area
