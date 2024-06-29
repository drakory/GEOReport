package controller

import (
	"georeportapi/dto"
	"georeportapi/service"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	loginDTO := dto.LoginDTO{}

	err := c.ShouldBind(&loginDTO)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "error binding from dto",
			"error":   err.Error(),
		})
		return
	}

	token, err := service.Login(loginDTO)

	if err != nil {
		c.JSON(400, gin.H{
			"message": "error - invalid username or password",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "login success",
		"token":   token})

}
