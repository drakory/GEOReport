package main

import (
	"georeportapi/config"
	"georeportapi/controller"
	"georeportapi/entity"
	"georeportapi/middleware"
	"github.com/gin-gonic/gin"
)

var Users []entity.User

func main() {
	config.ConnectDB()

	defer config.CloseDb()

	router := gin.Default()
	v1 := router.Group("/georeport")
	{
		homepage := v1.Group("/homepage")
		{
			homepage.GET("/", controller.Homepage)
		}

		auth := v1.Group("/auth")
		{
			auth.POST("/login", controller.Login)
		}

		report := v1.Group("/report")
		{
			report.GET("/", controller.GetAllReports)
			report.GET("/:id", controller.GetReport)
			report.POST("/reporting", middleware.Authorized(), controller.InsertReport)
			report.PUT("/update/:id", middleware.Authorized(), controller.UpdateReport) // DTO -> AUTH + OWNER -> OK
			report.DELETE("/delete/:id", middleware.Authorized(), controller.DeleteReport)
		}

		user := v1.Group("/user")
		{
			user.GET("/", controller.GetAllUsers) // SEM AUTH -> DTO RESPONSE (ID, NAME, EMAIL)
			user.GET("/:id", middleware.Authorized(), controller.Profile)          // AUTH - OWNER -> DTO RESPONSE (ID, NAME, EMAIL, PROFILE PICTURE)
			user.POST("/registration", controller.Register) 
			user.PUT("/update/:id", middleware.Authorized(), controller.UpdateProfile)    // AUTH - OWNER
			user.DELETE("/delete/:id", middleware.Authorized(), controller.DeleteAccount) // AUTH - OWNER
		}

	}
	router.Run(":3000")
}
