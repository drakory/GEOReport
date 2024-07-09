package main

import (
	"georeportapi/config"
	"georeportapi/controller"
	"georeportapi/middleware"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	config.ConnectDB()

	defer config.CloseDb()

	router := gin.Default()
	router.Use(CORSMiddleware())
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
			report.GET("/allreportsresolved", controller.GetAllReportsResolved) 
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
			user.DELETE("/delete/", middleware.Authorized(), controller.DeleteAccount) // AUTH - OWNER
		}

		admin := v1.Group("/admin")
		{
			admin.GET("/reports", middleware.Authorized("ADMIN", "AUTHORITY"), controller.GetAllReports) // AUTH -> DTO RESPONSE (ID, NAME, EMAIL)
			admin.PUT("/delete/:id", middleware.Authorized("ADMIN"), controller.DeleteAccountByAdmin) // AUTH -> DTO IN -> DTO OUT
		}

		authority := v1.Group("/authority")
		{
			authority.GET("/reports", middleware.Authorized("ADMIN", "AUTHORITY"), controller.GetAllReports)     // AUTH -> DTO RESPONSE (ID, NAME, EMAIL)
			authority.PUT("/update/:id", middleware.Authorized("AUTHORITY"), controller.UpdateReportByAuthority) // AUTH -> DTO IN -> DTO OUT
		}
		router.Run(":3000")
	}
}
