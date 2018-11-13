'use strict';
const ServiceResult = require('../models/service-results/service-results');
const UsersErrors = require('../constants/errors/users-errors');
const SecurityUtilities = require('../utilities/security/security-utilities');
const VerificationCode = require('../models/database/verification-code');

class UserService {

  /**
   *
   * @param {CreateUserDTO} createUserDTO - create user dto
   * @returns {Promise<ServiceResult>} - return created user
   */
  async createUser(createUserDTO) {
    try {
      let user = await DB.User.findByUsername(createUserDTO.username);

      if (user) {
        return new ServiceResult(UsersErrors.USER_ALREADY_EXISTS);
      }

      let verificationCode = await DB.VerificationCode.getByContent(createUserDTO.verificationCode);

      if (!verificationCode) {
          return new ServiceResult(UsersErrors.VERIFICATION_CODE_NOT_FOUND);
      }
      createUserDTO.passwordHash = await SecurityUtilities.hashPassword(createUserDTO.password);

      user = await DB.User.createUser(createUserDTO, verificationCode.className);

      DB.VerificationCode.deleteByContent(createUserDTO.verificationCode);
      
      return new ServiceResult(null, user);
    } catch (error) {
      console.error(error);
      return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
    }
  }

  /**
   *
   * @param {LoginUserDTO} loginUserDTO - login user dto
   * @returns {Promise<ServiceResult>} - return token for user
   */
  async loginUser(loginUserDTO) {
    try {
      let user = await DB.User.findByUsername(loginUserDTO.username);

      if (!user) {
        return new ServiceResult(UsersErrors.LOGIN_USER_NOT_FOUND);
      }

      let isPasswordValid = await SecurityUtilities.verifyPassword(
        loginUserDTO.password,
        user.dataValues.passwordHash
      );

      if (!isPasswordValid) {
        return new ServiceResult(UsersErrors.LOGIN_WRONG_PASSWORD);
      }

      let token = await SecurityUtilities.createJWT(user.dataValues.username, {
        id: user.dataValues.id,
        class: user.dataValues.class,
        role: user.dataValues.role
      });

      return new ServiceResult(null, {
        token: token,
        user: user
      });
    } catch (error) {
      console.error(error);
      return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
    }
  }

  async createVerificationCode(CreateVerificationCodeDTO) {
      try {
          let verificationCode = await DB.VerificationCode.createVerificationCode( CreateVerificationCodeDTO.classNames );

          return new ServiceResult(null, verificationCode);
      } catch (error) {
          console.error(error);
          return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
      }
  }

  async getClassUsers(className) {
      try {
          let users = await DB.User.getUsersByClassName(className);

          return new ServiceResult(null, users);
      } catch (error) {
          console.error(error);
          return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
      }
  }

  async getClasses(className) {
      try {
          let classes = await DB.User.getAllClasses();

          return new ServiceResult(null, classes);
      } catch (error) {
          console.error(error);
          return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
      }
  }
}

module.exports = UserService;
