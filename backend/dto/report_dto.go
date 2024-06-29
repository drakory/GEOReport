package dto

type ReportCreatedDTO struct {
	Type        string `json:"type" form:"type" binding:"required"`
	Location    string `json:"location" binding:"required"`
	Description string `json:"description" form:"description" binding:"required"`
	Photos		string `json:"photos" form:"photos" `
	UserID      uint64 `json:"user_id,omitempty"  form:"user_id,omitempty"`
}

type ReportResponseDTO struct {
	Type string `json:"type" form:"type" binding:"required"`
	Location  string `json:"location" binding:"required"`
}

type ReportUpdateDTO struct {
	Type        string `json:"type" form:"type" binding:"required"`
	Location    string `json:"location" binding:"required"`
	Description string `json:"description" form:"description" binding:"required"`
	Photos		string `json:"photos" form:"photos" `
	UserID      uint64 `json:"user_id,omitempty"  form:"user_id,omitempty"`
}
