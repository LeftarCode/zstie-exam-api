'use strict';
const ServiceResult = require('../models/service-results/service-results');
const QuestionsErrors = require('../constants/errors/questions-errors');

class QuestionsService {

  /**
   *
   * @param {GetQuestionListDTO} getQuestionsListDTO - get questions list dto
   * @returns {Promise<ServiceResult>}
   */
  async getQuestions(getQuestionsListDTO) {
    try {
      let questions = await DB.Question.getRandomNQuestionsForProfession(
        getQuestionsListDTO.count,
        getQuestionsListDTO.professionCode
      );

      return new ServiceResult(null, questions);
    } catch (error) {
      console.error(error);
      return new ServiceResult(QuestionsErrors.UNEXPECTED_ERROR);
    }

  }


}

module.exports = QuestionsService;
