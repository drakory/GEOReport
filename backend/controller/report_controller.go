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
		"reports": service.GetAllReports(),
	})
}

func GetAllReportsResolved(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "select reports",
		"reports": service.GetAllReportsResolved(),
	})
}

func GetReport(c *gin.Context) {
	reportID, _ := strconv.ParseUint(c.Param("id"), 10, 64)

	reportResponseDTO, err := service.GetReport(reportID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "select report",
		"report":  reportResponseDTO,
	})
}

func InsertReport(c *gin.Context) {
	var reportDTO dto.ReportCreatedDTO
	err := c.ShouldBind(&reportDTO)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "error insert report",
		})
		return
	}

	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	reportResponseDTO := service.InsertReport(reportDTO, userID)
	
	c.JSON(200, gin.H{
		"message": "report inserted successfully",
		"report": reportResponseDTO,
	})

}

func UpdateReport(c *gin.Context) {
	// Verificaçao de permissao
	reportID, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	if !service.IsAllowedToEdit(userID, reportID) {
		c.JSON(401, gin.H{
			"message": "you do not have the permission - you are not the owner of this report",
		})
		return
	}
	// Atualizaçao do report
	var reportDTO dto.ReportUpdateDTO
	err := c.ShouldBind(&reportDTO)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	reportResponseDTO, err := service.UpdateReport(reportDTO, reportID, userID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "update report",
		"report":  reportResponseDTO,
	})
}

func UpdateReportByAuthority(c *gin.Context) {
	// Verificaçao de permissao
	reportID, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	
	// Atualizaçao do report
	var reportDTO dto.ReportAuthorityUpdateDTO
	err := c.ShouldBind(&reportDTO)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	
	if reportDTO.Status != "Pending" && reportDTO.Status != "Resolved" && reportDTO.Status != "Being Resolved" {
        c.JSON(404, gin.H{
			"message": "Status is not valid. Please insert a valid status: Pending, Resolved or Being Resolved",
		})
		return
    } 
	
	reportResponseDTO, err := service.UpdateReportByAuthority(reportDTO, reportID, userID)
	if err != nil {
		c.JSON(404, gin.H{
			"message": "error",
			"error":   err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "update report",
		"report":  reportResponseDTO,
	})
}

func DeleteReport(c *gin.Context) {
	// Verificaçao de permissao
	reportID, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	if !service.IsAllowedToEdit(userID, reportID) {
		c.JSON(401, gin.H{
			"message": "you do not have the permission - you are not the owner of this report",
		})
		return
	}
	// Deleçao do report
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

func GetMyReports(c *gin.Context) {
	userID, _ := strconv.ParseUint(c.GetString("user_id"), 10, 64)
	c.JSON(200, gin.H{
		"message": "select report",
		"reports": service.GetMyReports(userID),
	})
}
