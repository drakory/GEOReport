package service

import (
	"georeportapi/dto"
	"georeportapi/repository"
)

func Login(loginDTO dto.LoginDTO) (string, error) {
	token := ""
	UserID, err := repository.Login(loginDTO)
	if err != nil {
		return token, err
	}

	token, _ = CreateToken(UserID)
	return token, nil
}
