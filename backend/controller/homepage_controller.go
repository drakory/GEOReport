package controller

import (
	"github.com/gin-gonic/gin"
	
)

// Homepage is a function that returns a welcome message.
func Homepage(c *gin.Context) {
	
	c.JSON(200, gin.H{
		"message": "Welcome to the homepage!",
	})
}