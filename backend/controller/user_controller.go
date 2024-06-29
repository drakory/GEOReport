package controller

import (
	"georeportapi/dto"
	"georeportapi/entity"
	"georeportapi/service"
	"strconv"

	"github.com/gin-gonic/gin"
	"time"
)

func GetAllUsers(c *gin.Context) {
	usersResponse := service.GetAllUsers()
	c.JSON(200, gin.H{
		"message": "select users",
		"users": usersResponse,
	})
}

func Register(c *gin.Context) {
	var user dto.RegisterDTO
	err := c.ShouldBind(&user)
	if err != nil {
		c.JSON(400,gin.H{
			"message":"error",
			"error": err.Error(),
		})
		return
	}
	if service.IsUsedEmail(user.Email) {
		c.JSON(401, gin.H{
			"message": "the email you fill is already used",
		})
		return
	}

	if !service.IsValidEmail(user.Email) {
		c.JSON(401, gin.H{
			"message": "the email you fill is invalid",
		})
		return
	}

	userResponse := service.Register(user)
	c.JSON(200, gin.H{
		"message": "Insert user",
		"user" : userResponse,
	})

	wait := time.Duration(4) * time.Second	
	time.Sleep(wait)
	/*Login(c)

	c.Redirect(303, "localhost:3000/georeport/homepage/")*/
}

func Profile(c *gin.Context) {
	identifiant, _ := strconv.ParseUint(c.Param("id"), 10,64)
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	if !service.IsAllowed(userID, identifiant) {
		c.JSON(401, gin.H{
			"message": "you do not have the permission - you are not the owner of this user",
		})
		return
	}
	/*if error != nil {
		c.JSON(400,gin.H{
			"message":"error",
			"error": error.Error(),
		})
		return
	}*/
	
	user, err := service.Profile(identifiant)
	if err != nil {
		c.JSON(404,gin.H{
			"message":"error",
			"error": err.Error(),
		})
		return 
	}
	c.JSON(200, gin.H{
		"message": "select user searched using ID",
		"user": user,
	})
}

func UpdateProfile(c *gin.Context) {

	identifiant, _ := strconv.ParseUint(c.Param("id"), 10,64)
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	if !service.IsAllowed(userID, identifiant) {
		c.JSON(401, gin.H{
			"message": "you do not have the permission - you are not the owner of this user",
		})
		return
	}
	/*if error != nil {
		c.JSON(400,gin.H{
			"message":"error",
			"error": error.Error(),
		})
		return
	}*/

	var user entity.User
	c.ShouldBind(&user)
	
	err := service.UpdateProfile(user,identifiant)
	if err != nil {
		c.JSON(404,gin.H{
			"message":"User doesn't exist",
		})
	}
	c.JSON(200, gin.H{
		"message": "user updated using id" + c.Param("id"),
	})
	
}

func DeleteAccount(c *gin.Context) {
	IDPage, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	if !service.IsAllowed(userID, IDPage) {
		c.JSON(401, gin.H{
			"message": "you do not have the permission - you are not the owner of this user",
		})
		return
	}
	/*if error != nil {
		c.JSON(400,gin.H{
			"message":"error",
			"error": error.Error(),
		})
		return
	}*/

	err := service.DeleteAccount(userID)
	if err != nil{
		c.JSON(404,gin.H{
			"message":"User doesn't exist",
			"error":   err.Error(),
		})
	}	
		
	c.JSON(200, gin.H{
		"message": "Delete user using id" + c.Param("id"),
	})
	
}