'use strict';

module.exports = function (sequelize, DataTypes) {

  /**
   * @memberOf DB
   */
  let Exam = sequelize.define('Exam', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    professionCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finishTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Exam.associate = function (DB) {
    Exam.belongsToMany(DB.Question, {
      through: {
        model: DB.Answer
      },
      foreignKey: 'examId'
    });
  };

  Exam.createExam = async function (model) {
    let startTime = new Date();
    let finishTime = new Date();

    finishTime.setHours(finishTime.getHours() + 1);

    return DB.Exam.create({
      userId: model.userId,
      professionCode: model.professionCode,
      startTime: startTime,
      finishTime: finishTime,
      isFinished: false
    });
  };

  Exam.finishExamById = async function (id) {
    return DB.Exam.update({
      isFinished: true
    }, {
      where: {
        id: id
      }
    });
  };

  Exam.getNotFinishedExamByUserId = async function (model) {
    let currentTime = new Date();

    return DB.Exam.find({
      include: [
        {model: DB.Question}
      ],
      where: {
        userId: model.userId,
        $and: [
          {
            startTime: {
              $lte: currentTime
            }
          },
          {
            finishTime: {
              $gte: currentTime
            }
          },
          {
            isFinished: {
              $ne: true
            }
          }
        ]
      }
    });
  };

  Exam.getExamById = async function (model) {
    return DB.Exam.find({
      include: [
        {model: DB.Question}
      ],
      where: {
        id: model.id
      }
    });
  };

  Exam.getExamQuestions = async function (id) {
    return DB.Exam.find({
      include: [
        {model: DB.Question}
      ],
      where: {
        id: id
      }
    });
  };

  Exam.getUserExamById = async function (id) {
    return DB.Exam.findAll({
      include: [
        {model: DB.Question}
      ],
      order: [['updatedAt', 'DESC']],
      where: {
        userId: id
      }
    });
  };

  return Exam;
};
