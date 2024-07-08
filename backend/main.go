package main

import (
	"georeportapi/config"
	"georeportapi/controller"
	"georeportapi/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	defer config.CloseDb()

	router := gin.Default()
	v1 := router.Group("/georeport")
	{
		homepage := v1.Group("/homepage")
		{
			homepage.GET("/", controller.Homepage) // SEM AUTH
			//penso que tenha de ser aqui esta route pls confirm
			homepage.GET("/authority", middleware.Authorized("AUTHORITY"), controller.AuthorityHomepage) // AUTHORITY
		}

		auth := v1.Group("/auth")
		{
			auth.POST("/login", controller.Login) //
		}

		report := v1.Group("/report")
		{
			report.GET("/", middleware.Authorized(), controller.GetMyReports)              // DTO et AUTH OK                                      // SEM AUTH
			report.GET("/:id", controller.GetReport)                                       // Ainda nao toquei   // SEM AUTH com DTO OUT
			report.POST("/reportissue", middleware.Authorized(), controller.InsertReport)  // DTO IN -> AUTH -> DTO OUT
			report.PUT("/update/:id", middleware.Authorized(), controller.UpdateReport)    // DTO IN -> AUTH + OWNER -> DTO OUT
			report.DELETE("/delete/:id", middleware.Authorized(), controller.DeleteReport) // AUTH + OWNER
		}

		user := v1.Group("/user")
		{
			user.GET("/", middleware.Authorized(), controller.Profile)                    // O user so acede as suas proprias informaçoes              // AUTH - OWNER -> DTO RESPONSE (ID, NAME, EMAIL, PROFILE PICTURE)
			user.POST("/registration", controller.Register)                               // Falta autenticaçao depois do register e redirection to homepage    // SEM AUTH -> DTO IN -> DTO OUT
			user.PUT("/update/", middleware.Authorized(), controller.UpdateProfile)       // AUTH - OWNER
			user.DELETE("/delete/:id", middleware.Authorized(), controller.DeleteAccount) // AUTH - OWNER
		}

		admin := v1.Group("/admin")
		{
			admin.GET("/reports", middleware.Authorized("ADMIN", "AUTHORITY"), controller.GetAllReports) // AUTH -> DTO RESPONSE (ID, NAME, EMAIL)
		}

		authority := v1.Group("/authority")
		{
			authority.GET("/reports", middleware.Authorized("ADMIN", "AUTHORITY"), controller.GetAllReports) // AUTH -> DTO RESPONSE (ID, NAME, EMAIL)
		}
		router.Run(":3000")
	}
}
