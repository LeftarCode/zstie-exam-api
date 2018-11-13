'use strict';

module.exports = function (sequelize, DataTypes) {

  /**
   * @memberOf DB
   */
  let Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    examId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    answer: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Answer.associate = function (DB) {
  };

  Answer.createAnswer = async function (model) {
    return DB.Answer.create({
      examId: model.examId,
      questionId: model.questionId,
      answer: model.answer
    });
  };

  Answer.updateAnswer = async function (model) {
    return DB.Answer.update({
      answer: model.answer
    }, {
      where: {
        questionId: model.questionId,
        examId: model.examId
      }
    });
  };

  Answer.getAnswersByExamId = async function (id) {
    return DB.Answer.findAll({
      where: {
        examId: id
      }
    });
  };

  return Answer;
};
