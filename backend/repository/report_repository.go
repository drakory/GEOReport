package repository

import (
	"errors"
	"georeportapi/config"
	"georeportapi/entity"
)

func GetAllReports() []entity.Report {
	var reports []entity.Report
	config.Db.Preload("User").Find(&reports)

	return reports
}

func GetReport(reportID uint64) (entity.Report, error) {
	var report entity.Report
	config.Db.Preload("User").First(&report, reportID)
	if report.ID != 0 {
		return report, nil
	}

	return report, errors.New("report do not exists")
}

func InsertReport(report entity.Report) entity.Report {
	config.Db.Save(&report)
	config.Db.Preload("User").Find(&report)

	return report
}

func UpdateReport(report entity.Report) (entity.Report, error) {
	if report , err := GetReport(report.ID); err == nil {
		config.Db.Save(&report)
		config.Db.Preload("User").Find(&report)
		return report, nil
	}
	return report, errors.New("report do not exists")
}

func DeleteReport(reportID uint64) error {
	var report entity.Report
	config.Db.First(&report, reportID)
	if report.ID != 0 {
		config.Db.Delete(&report)
		return nil
	}
	return errors.New("report do not exists")
}

func GetTheReportUsingID(reportID uint64) entity.Report {
	var report entity.Report
	config.Db.Preload("User").First(&report, reportID)
	return report
}

func GetMyReports(userID uint64) []entity.Report {
	var reports []entity.Report
	config.Db.Preload("User").Where("user_id = ?", userID).Find(&reports)
	return reports
}