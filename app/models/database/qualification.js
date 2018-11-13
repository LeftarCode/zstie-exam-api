'use strict';

module.exports = function (sequelize, DataTypes) {

  /**
   * @memberOf DB
   */
  let Qualification = sequelize.define('Qualification', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  /**
   *
   * @returns {Promise<Array<Qualification>>} - return all qualifications
   */
  Qualification.getAllQualifications = async function () {
    return DB.Qualification.findAll();
  };

  Qualification.getQualificationByCode = async function (code) {
    return DB.Qualification.find({
      where: {
        code: code
      }
    });
  };

  return Qualification;
};
