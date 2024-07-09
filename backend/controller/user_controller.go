package controller

import (
	"georeportapi/dto"
	"georeportapi/service"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/mashingan/smapping"
)

func Register(c *gin.Context) {
	var user dto.RegisterDTO
	err := c.ShouldBind(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	// Check if the email is valid and non used
	if !service.IsValidEmail(user.Email) {
		c.JSON(401, gin.H{
			"message": "the email you fill is invalid",
		})
		return
	}
	if service.IsUsedEmail(user.Email) {
		c.JSON(401, gin.H{
			"message": "the email you fill is already used",
		})
		return
	}

	//userResponse :=
	service.Register(user)

	var loginDTO dto.LoginDTO
	err = smapping.FillStruct(&loginDTO, smapping.MapFields(&user))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return
	}
	token, _ := service.Login(loginDTO) // Execute the Login function before the server response is sent

	// Add token in cookies
	c.SetCookie("token", token, 3600, "/", "localhost", false, true)

	/*c.JSON(200, gin.H{
		"message": "Insert user",
		"user" : userResponse,
		"token": token,
	})*/

	//c.Redirect(303, "/georeport/homepage/")
}

func Profile(c *gin.Context) {
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	user, err := service.Profile(userID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "select user searched using ID",
		"user":    user,
	})
}

func UpdateProfile(c *gin.Context) {
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)

	var user dto.UserUpdateDTO
	c.ShouldBind(&user)

	// Check if the email is valid and non used
	if !service.IsValidEmail(user.Email) {
		c.JSON(401, gin.H{
			"message": "the email you fill is invalid",
		})
		return
	}
	if service.IsUsedEmail(user.Email) {
		c.JSON(401, gin.H{
			"message": "the email you fill is already used",
		})
		return
	}

	userResponse, err := service.UpdateProfile(user, userID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "User doesn't exist",
		})
	}
	c.JSON(200, gin.H{
		"message": userResponse,
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
	if err != nil {
		c.JSON(404, gin.H{
			"message": "User doesn't exist",
			"error":   err.Error(),
		})
	}

	c.JSON(200, gin.H{
		"message": "Delete user using id" + c.Param("id"),
	})

}
