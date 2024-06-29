package service

import (
	"errors"
	"georeportapi/dto"
	"georeportapi/entity"
	"georeportapi/repository"
	"github.com/mashingan/smapping"
	"log"
)

func GetAllUsers() []dto.UserALLResponseDTO {
	users := repository.GetAllUsers()
	var usersResponse []dto.UserALLResponseDTO
	for _, user := range users {
        var userResponse dto.UserALLResponseDTO
        err := smapping.FillStruct(&userResponse, smapping.MapFields(&user))
        if err != nil {
            log.Fatal("failed to map to response ", err)
			return usersResponse
        }
        usersResponse = append(usersResponse, userResponse)
    }
	return usersResponse
}

func Register(user entity.User) entity.User {
	user = repository.InsertUser(user)
	return user
}

func Profile(id uint64) (dto.UserIDResponseDTO,error) {
	
	userResponse := dto.UserIDResponseDTO{}

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

func UpdateProfile(user entity.User, id uint64) error {
	user.ID=id
	if err := repository.UpdateUser(user); err == nil{
		return nil 
	}
	return errors.New("user do not exist")
}

func DeleteAccount(identifiant uint64) error {
	if err := repository.DeleteUser(identifiant); err == nil{
		return nil
	}
	return errors.New("user do not exist") 
}

func IsAllowed(userID uint64, pageID uint64) bool {
	u := repository.GetTheUserUsingID(pageID)
	return userID == u.ID
}
