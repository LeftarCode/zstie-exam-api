'use strict';
const ServiceResult = require("../models/service-results/service-results");
const QualificationErrors = require("../constants/errors/qualifications-errors");

class QualificationService {

  async getAllQualifications() {
    try {
      let qualifications = await DB.Qualification.getAllQualifications();

      return new ServiceResult(null, qualifications);
    } catch (error) {
      console.error(error);
      return new ServiceResult(QualificationErrors.UNEXPECTED_ERROR);
    }
  }
}

module.exports = QualificationService;
