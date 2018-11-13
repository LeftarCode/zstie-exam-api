'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

  /**
   * @memberOf DB
   */
  let Question = sequelize.define('Question', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    professionCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correctAnswerIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  });

  Question.associate = function (DB) {
    Question.belongsToMany(DB.Exam, {
      through: {
        model: DB.Answer
      },
      foreignKey: 'questionId'
    });
  };

  /**
   * Get Random n(count) questions for selected profession
   * @param {Number} count - question count
   * @param {String} professionCode - profession code for question
   * @return {Promise<Array<DB.Question>>} - array of questions
   */
  Question.getRandomNQuestionsForProfession = async function (count, professionCode) {
    return DB.Question.findAll({
      limit: count,
      where: {
        professionCode: professionCode
      },
      order: [
        [Sequelize.literal('RANDOM()')]
      ]
    });
  };

  /**
   * Get question by id
   * @param {String} id - question id
   * @returns {Promise<DB.Question>} - question
   */
  Question.getById = async function (id) {
    return DB.Question.find({
      where: {
        id: id
      }
    });
  };

  Question.createQuestion = async function (dto) {
      return DB.Question.create({
          professionCode: dto.professionCode,
          imageUrl: dto.imageUrl,
          correctAnswerIndex: dto.correctAnswerIndex,
          content: dto.content,
          answers: dto.answers
      });
  }

  return Question;
};
