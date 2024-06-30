package dto

type ReportCreatedDTO struct {
	Type       	string  	`gorm:"type:varchar(150)" json:"type" binding:"required"`	
    Latitude    float64 	`gorm:"type:decimal(10,8)" json:"latitude"`
    Longitude   float64 	`gorm:"type:decimal(11,8)" json:"longitude"`
	Description string  	`gorm:"type:text" json:"description"`
	Photos		string  	`gorm:"type:varchar(1024); default:'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg'" json:"photos"`
	Status		string  	`gorm:"type:enum('pending', 'resolved');default:'pending'" json:"status"`
	UserID      uint64 		`json:"user_id,omitempty"  form:"user_id,omitempty"`
}

type ReportResponseDTO struct {
	Type 		string 		`json:"type" form:"type" binding:"required"`
	Latitude    float64 	`gorm:"type:decimal(10,8)" json:"latitude"`
    Longitude   float64 	`gorm:"type:decimal(11,8)" json:"longitude"`
	Status		string  	`gorm:"type:enum('pending', 'resolved');default:'pending'" json:"status"`
}

type ReportUpdateDTO struct {
	Description string  	`gorm:"type:text" json:"description"`
	Photos		string  	`gorm:"type:varchar(1024); default:'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg'" json:"photos"`
	UserID      uint64 		`json:"user_id,omitempty"  form:"user_id,omitempty"`
}
