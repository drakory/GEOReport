package middleware

import (
	"georeportapi/service"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func Authorized() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "failed to process request - token not found",
			})
			return
		}
		token, err := service.ValidateToken(authHeader)
		if !token.Valid {
			log.Println(err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "token is not valid",
			})
			return
		}

		/*for _, role := range allowedRoles {
		    if user.Role == role {
		        c.Next()
		        return
		    }
		}*/

		claims := token.Claims.(jwt.MapClaims)
		c.Set("user_id", claims["user_id"])
		c.Next()
	}
}
