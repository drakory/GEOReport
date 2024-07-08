package service

import (
	"georeportapi/dto"
	"georeportapi/repository"

	"golang.org/x/crypto/bcrypt"
)

func Login(loginDTO dto.LoginDTO) (string, error) {
	token := ""
	
	hashedPassword, UserID, err := repository.GetHashedPassword(loginDTO.Email)
	if err != nil {
		// Usuário não encontrado
		return token, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(loginDTO.Password))
	if err != nil {
		// Senha não corresponde
		return token, err
	}
	// Senha corresponde
	token, _ = CreateToken(UserID)
	return token, nil

}
