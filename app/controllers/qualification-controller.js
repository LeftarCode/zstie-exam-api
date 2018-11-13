'use strict';
const QualificationService = require('../services/qualification-service');
const QualificationSimpleModel = require('../models/response/qualification/qualification-simple-model');

class QualificationController {

  constructor() {
    this.qualificationService = new QualificationService();
  }

  async getAllQualifications(req, res, next) {
    let qualifications = await this.qualificationService.getAllQualifications();

    let qualificationsSimpleModel = qualifications.data.map(model => new QualificationSimpleModel(model));

    res.status(200).json(qualificationsSimpleModel);
  }

  registerRoutes(router) {
    router.get('/qualifications', this.getAllQualifications.bind(this));
  }
}

module.exports = QualificationController;
