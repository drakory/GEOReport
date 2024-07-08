package service

import (
	"errors"
	"georeportapi/dto"
	"georeportapi/entity"
	"georeportapi/repository"
	"log"

	"github.com/mashingan/smapping"
)

func GetAllReports() []entity.Report {
	return repository.GetAllReports()
}

func GetMyReports(userID uint64) []dto.ReportResponseDTO {
	reports := repository.GetMyReports(userID)
	var reportsResponseDTO []dto.ReportResponseDTO
	for _, report := range reports {
		var reportResponseDTO dto.ReportResponseDTO
		err := smapping.FillStruct(&reportResponseDTO, smapping.MapFields(&report))
		if err != nil {
			log.Fatal("failed to map to response ", err)
			return reportsResponseDTO
		}
		reportsResponseDTO = append(reportsResponseDTO, reportResponseDTO)
	}
	return reportsResponseDTO
}

func InsertReport(reportDTO dto.ReportCreatedDTO, userID uint64) dto.ReportResponseDTO {
	report := entity.Report{}
	reportResponse := dto.ReportResponseDTO{}

	err := smapping.FillStruct(&report, smapping.MapFields(&reportDTO))
	if err != nil {
		log.Fatal("failed to map ", err)
		return reportResponse
	}

	report.UserID = userID
	report.Status = "Pending"
	report = repository.InsertReport(report)

	err = smapping.FillStruct(&reportResponse, smapping.MapFields(&report))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return reportResponse
	}

	return reportResponse
}

func GetReport(reportID uint64) (dto.ReportResponseDTO, error) {
	report, err := repository.GetReport(reportID)
	if err != nil {
		return dto.ReportResponseDTO{}, errors.New("report does not exist")
	}
	var reportResponseDTO dto.ReportResponseDTO
	err = smapping.FillStruct(&reportResponseDTO, smapping.MapFields(&report))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return reportResponseDTO, err
	}

	return reportResponseDTO, nil
}

func UpdateReport(reportDTO dto.ReportUpdateDTO, reportID uint64, userID uint64) (dto.ReportResponseDTO, error) {
	report := entity.Report{}
	reportResponse := dto.ReportResponseDTO{}

	err := smapping.FillStruct(&report, smapping.MapFields(&reportDTO))
	if err != nil {
		log.Fatal("failed to map ", err)
		return reportResponse, err
	}

	report.UserID = userID
	report.ID = reportID
	report, _ = repository.UpdateReport(report)

	err = smapping.FillStruct(&reportResponse, smapping.MapFields(&report))
	if err != nil {
		log.Fatal("failed to map to response ", err)
		return reportResponse, err
	}

	return reportResponse, nil
}

func DeleteReport(reportID uint64) error {
	if err := repository.DeleteReport(reportID); err == nil {
		return nil
	}
	return errors.New("report does not exist")
}

func IsAllowedToEdit(userID uint64, reportID uint64) bool {
	r := repository.GetTheReportUsingID(reportID)
	return userID == r.UserID
}
