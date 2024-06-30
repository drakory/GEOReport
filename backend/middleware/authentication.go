package middleware

import (
	"georeportapi/entity"
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
		// Extract claims from the token
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "failed to process request - invalid token claims",
			})
			return
		}

		// Extract user_id from claims
		userID, ok := claims["user_id"].(uint64)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "failed to process request - user_id not found in token claims",
			})
			return
		}

		//penso que vá ter de fazer um GetUserByID para por isto a funcionar
		user, ok := userID.(entity.User)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type in context"})
			return
		}

		for _, role := range allowedRoles {
			if user.Role == role {
				c.Next()
				return
			}
		}

		claims := token.Claims.(jwt.MapClaims)
		c.Set("user_id", claims["user_id"])
		c.Next()
	}
}
