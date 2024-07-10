package service

import (
	"errors"
	"georeportapi/dto"
	"georeportapi/entity"
	"georeportapi/repository"
	"log"
	"regexp"

	"github.com/mashingan/smapping"
	"golang.org/x/crypto/bcrypt"
)

func Register(userDTO dto.RegisterDTO) { //dto.UserIDResponseDTO {
	user := entity.User{}
	userResponse := dto.UserResponseDTO{}

	err := smapping.FillStruct(&user, smapping.MapFields(&userDTO))
	if err != nil {
		log.Fatal("failed to map ", err)
		return //userResponse
	}

	// Hash da senha do usuário antes de inserir no banco de dados
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		log.Fatal("failed to hash password ", err)
		return
	}
	user.Password = hashedPassword

	user = repository.InsertUser(user)
	err = smapping.FillStruct(&userResponse, smapping.MapFields(&user))
	if err != nil {
		log.Fatal("failed to map response DTO", err)
		return //userResponse
	}

	//return userResponse
}

func Profile(id uint64) (dto.UserResponseDTO, error) {

	userResponse := dto.UserResponseDTO{}

	user, err := repository.GetUser(id)
	if err != nil {
		return userResponse, errors.New("user do not exists")
	}

	err = smapping.FillStruct(&userResponse, smapping.MapFields(&user))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return userResponse, err
	}

	return userResponse, nil
}

func UpdateProfile(userDTO dto.UserUpdateDTO, id uint64) (dto.UserResponseDTO, error) {
	var user entity.User
	var userResponse dto.UserResponseDTO

	err := smapping.FillStruct(&user, smapping.MapFields(&userDTO))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return userResponse, err
	}

	if user.Password != "" {
		// Hash da senha do usuário antes de inserir no banco de dados
		hashedPassword, err := hashPassword(user.Password)
		if err != nil {
			log.Fatal("failed to hash password ", err)
			return userResponse, err
		}
		user.Password = hashedPassword
	}

	user.ID = id
	user = repository.UpdateUser(user)

	err = smapping.FillStruct(&userResponse, smapping.MapFields(&user))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return userResponse, err
	}

	return userResponse, nil
}

func DeleteAccount(identifiant uint64) error {
	if err := repository.DeleteUser(identifiant); err == nil {
		return nil
	}
	return errors.New("user do not exist")
}

// what does this function do? ask ricardo
func IsAllowed(userID uint64, pageID uint64) bool {
	u := repository.GetTheUserUsingID(pageID)
	return userID == u.ID
}

func IsUsedEmail(email string) bool {
	e := repository.GetUserByEmail(email)
	return e.Email == email // IF TRUE, EMAIL IS VALID
}

func IsValidEmail(email string) bool {
	var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// Função para hash da senha
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Admin function
func AdminChangeUserRole(userID uint64, role dto.AdminChangeUserRoleDTO) (dto.UserResponseDTO, error) {
	var user entity.User
	var userResponse dto.UserResponseDTO

	user = repository.GetTheUserUsingID(userID)
	user.Role = role.Role
	user = repository.UpdateUser(user)

	err := smapping.FillStruct(&userResponse, smapping.MapFields(&user))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return userResponse, err
	}

	return userResponse, nil
}
