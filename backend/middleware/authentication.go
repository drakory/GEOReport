package middleware

import (
	"georeportapi/entity"
	"georeportapi/repository"
	"georeportapi/service"
	"log"
	"net/http"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func Authorized(allowedRoles ...string) gin.HandlerFunc {
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

		claims := token.Claims.(jwt.MapClaims)
		userIDStr, ok := claims["user_id"].(string) // Assuming userID is stored as a string in token claims
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "user_id not found in token claims"})
			return
		}

		userID, err := strconv.ParseUint(userIDStr, 10, 64) // Convert string to uint64
		if err != nil {
			log.Println("Error converting userID to uint64:", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "invalid user_id format"})
			return
		}
		// Retrieve user from the database or user service
		user := repository.GetTheUserUsingID(userID) // GetUserByID needs to be implemented in your user service

		if(allowedRoles != nil){
			// Check if the user's role is in the list of allowed roles
			isAllowed := false
			for _, role := range allowedRoles {
				if user.Role == entity.UserRole(role) {
					isAllowed = true
					break
				}
			}

			if !isAllowed {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"message": "Access denied - insufficient permissions"})
				return
			}
		}
		

		c.Set("user_id", claims["user_id"])
		c.Next()
	}
}
