'use strict';

module.exports = function (sequelize, DataTypes) {
  /**
   * @memberOf DB
   */
  let User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('USER', 'ADMIN'),
      allowNull: false
    }
  });

  User.createUser = async function (createUserDTO, className) {
    return DB.User.create({
      fullName: createUserDTO.fullName,
      username: createUserDTO.username,
      passwordHash: createUserDTO.passwordHash,
      class: className,
      role: 'USER'
    });
  };

  User.findByUsername = async function (username) {
    return DB.User.find({
      where: {
        username: username
      }
    });
  };

  User.getUsersByClassName = async function (className) {
      return DB.User.findAll({
          where: {
              class: className
          }
      });
  };

  User.getAllClasses = async function (className) {
      return DB.User.findAll({
          attributes: [["class", "className"]],
          group: "class" 
      });
  };

  return User;
};
