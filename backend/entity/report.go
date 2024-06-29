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


	// Title string `gorm:"type:varchar(255)" json:"title"`
	// maybe have to separate the location to lat and long?
	// maybe have more than one photo in the future (array of photos?)
	//Status string `gorm:"type:enum('pending', 'approved', 'rejected');default:'pending'" json:"status"`
	//Type string `gorm:"type:varchar(255)" json:"type"`
// maybe add a title to the report?
// status commented but i need it to be implemented maybe has to be another entity since it's the admin who updates it
// should add some kind of stock photo to the report if the user doesn't provide one
/* Note: i can maybe add the user name to the report,
but i think it's not necessary*/