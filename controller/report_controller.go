package controller

import (
	"georeportapi/dto"
	"georeportapi/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAllReports(c *gin.Context) {

	c.JSON(200, gin.H{
		"message": "select reports",
		"reports":   service.GetAllReports(),
	})
}

func InsertReport(c *gin.Context) {
	var report dto.ReportCreatedDTO
	err := c.ShouldBind(&report)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)

	b := service.InsertReport(report, userID)
	c.JSON(200, gin.H{
		"message": "insert report",
		"report":    b,
	})
}

func GetReport(c *gin.Context) {
	reportID, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	report, err := service.GetReport(reportID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "select report",
		"report":    report,
	})
}

func UpdateReport(c *gin.Context) {

	reportID, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	if !service.IsAllowedToEdit(userID, reportID) {
		c.JSON(401, gin.H{
			"message": "you do not have the permission - you are not the owner of this report",
		})
		return
	}

	var report dto.ReportUpdateDTO
	err := c.ShouldBind(&report)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	reportResponse, err := service.UpdateReport(report, reportID, userID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "update report",
		"report":    reportResponse,
	})
}

func DeleteReport(c *gin.Context) {
	reportID, _ := strconv.ParseUint(c.Param("id"), 10, 64)

	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)

	if !service.IsAllowedToEdit(userID, reportID) {
		c.JSON(401, gin.H{
			"message": "you do not have the permission - you are not the owner of this report",
		})
		return
	}

	err := service.DeleteReport(reportID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "report deleted",
	})
}
