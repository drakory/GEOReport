package repository

import (
	"errors"
	"georeportapi/config"
	"georeportapi/entity"
)

func InsertReport(book entity.Report) entity.Report {
	config.Db.Save(&book)
	config.Db.Preload("User").Find(&book)

	return book
}

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

	return report, errors.New("book do not exists")
}

func UpdateReport(report entity.Report) (entity.Report, error) {
	if _, err := GetReport(report.ID); err == nil {
		config.Db.Save(&report)
		config.Db.Preload("User").Find(&report)
		return report, nil
	}
	return report, errors.New("book do not exists")
}

func DeleteReport(reportID uint64) error {
	var report entity.Report
	config.Db.First(&report, reportID)
	if report.ID != 0 {
		config.Db.Delete(&report)
		return nil
	}
	return errors.New("book do not exists")
}

func GetTheReportUsingID(reportID uint64) entity.Report {
	var report entity.Report
	config.Db.Preload("User").First(&report, reportID)
	return report
}
