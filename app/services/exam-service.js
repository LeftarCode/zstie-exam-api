'use strict';
const ServiceResult = require('../models/service-results/service-results');
const ExamErrors = require('../constants/errors/exams-errors');

class ExamService {

  /**
   *
   * @param {SendExamDTO} sendExamDTO - get questions list dto
   * @returns {Promise<ServiceResult>}
   */
  async createExam(sendExamDTO) {
    try {
      let exam = await DB.Exam.createExam({
        userCode: sendExamDTO.userCode,
        questionsId: sendExamDTO.questionsId,
        answersIndices: sendExamDTO.answersIndices,
        score: 0,
        maxScore: sendExamDTO.questionsId.length
      });

      return new ServiceResult(null, exam);
    } catch (error) {
      console.error(error);
      return new ServiceResult(ExamErrors.UNEXPECTED_ERROR);
    }

  }

  /**
   *
   * @param {SendExamDTO} sendExamDTO
   * @returns {Promise<ServiceResult>}
   */
  async finishExamById(id) {
    try {
      let exam = await DB.Exam.finishExamById(id);

      if (!exam){
        return new ServiceResult(ExamErrors.EXAM_NOT_FOUND);
      }

      return new ServiceResult(null, exam);
    } catch (error) {
      console.error(error);
      return new ServiceResult(ExamErrors.UNEXPECTED_ERROR);
    }
  }

  async getExamById(getExamDTO) {
    try {
      let exam = await DB.Exam.getExamById(getExamDTO);

      if (!exam) {
        return new ServiceResult(ExamErrors.EXAM_NOT_FOUND);
      }

      return new ServiceResult(null, exam);
    } catch (error) {
      console.error(error);
      return new ServiceResult(ExamErrors.UNEXPECTED_ERROR);
    }
  }

  async getNotFinishedExamByUserId(sendExamDTO) {
    try {
      let exam = await DB.Exam.getNotFinishedExamByUserId(sendExamDTO);

      if (!exam) {
        return new ServiceResult(ExamErrors.EXAM_NOT_FOUND);
      }

      return new ServiceResult(null, exam);
    } catch (error) {
      console.error(error);
      return new ServiceResult(ExamErrors.UNEXPECTED_ERROR);
    }
  }

  async getActiveExamList(userId) {
      try {
          let exam = await DB.Exam.getNotFinishedExamByUserId({
              userId: userId
          });

          if (!exam) {
              return new ServiceResult(ExamErrors.EXAM_NOT_FOUND);
          }

          let qualification = await DB.Qualification.getQualificationByCode(exam.professionCode);

          return new ServiceResult(null, qualification);
      } catch (error) {
          console.error(error);
          return new ServiceResult(ExamErrors.UNEXPECTED_ERROR);
      }
  }
}

module.exports = ExamService;
