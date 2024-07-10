package repository

import (
	"errors"
	"georeportapi/config"
	"georeportapi/entity"
)

func InsertUser(user entity.User) entity.User {
	config.Db.Save(&user)
	config.Db.Find(&user)
	return user
}

func GetUser(userID uint64) (entity.User, error) {
	var user entity.User
	config.Db.First(&user, userID)
	if user.ID != 0 {
		return user, nil
	}

	return user, errors.New("user do not exists")
}

func UpdateUser(user entity.User) entity.User {
	existingUser, err := GetUser(user.ID)
	if err != nil {
		return user
	}
	existingUser.Name = user.Name
	existingUser.ProfilePicture = user.ProfilePicture
	if user.Email != "" && user.Email != existingUser.Email{
		existingUser.Email = user.Email
	}
	if user.Password != "" {
		existingUser.Password = user.Password
	}
	
	// Save the updated report back to the database
	config.Db.Save(&existingUser)
	// Preload the User and find the updated report
	config.Db.Find(&existingUser)

	return existingUser
}

func DeleteUser(userID uint64) error {
	var user entity.User
	config.Db.First(&user, userID)
	if user.ID != 0 {
		config.Db.Delete(&user)
		return nil
	}
	return errors.New("user do not exists")
}

func GetTheUserUsingID(userID uint64) entity.User {
	var user entity.User
	config.Db.First(&user, userID)
	return user
}

func GetUserByEmail(email string) entity.User {
	var user entity.User
	config.Db.Where("email = ?", email).First(&user)
	return user
}
