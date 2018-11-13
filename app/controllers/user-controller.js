'use strict';
const {validationResult} = require('express-validator/check');
const UserService = require('../services/user-service');
const CreateUserDTO = require('../models/dto/user/dto-create-user');
const LoginUserDTO = require('../models/dto/user/dto-login-user');
const UsersErrors = require('../constants/errors/users-errors');
const SecurityUtilities = require('../utilities/security/security-utilities');
const UserLoginSimpleModel = require('../models/response/user/user-login-simple-model');
const VerificationCodeSimpleModel = require('../models/response/user/verification-code-simple-model');
const CreateVerificationCodeDTO = require('../models/dto/user/dto-create-verification-code');
const UserSimpleModel = require('../models/response/user/user-simple-model')

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req, res, next) {
    let validationErrors = validationResult(req.body);
    let createUserDTO = new CreateUserDTO(req.body);

    if (!validationErrors.isEmpty()) {
      res.sendError(UsersErrors.CREATE_WRONG_DATA);
      return next();
    }

    let user = await this.userService.createUser(createUserDTO);

    if (!user.isSuccess) {
      res.sendError(user.error);
      return next();
    }

    let token = await SecurityUtilities.createJWT(user.data.username, {
      id: user.data.id,
      class: user.data.class,
      role: user.data.role
    });

    res.status(201).json({
      token: token
    });
    
    next();
  }

  async loginUser(req, res, next) {
    let validationErrors = validationResult(req.body);
    let loginUserDTO = new LoginUserDTO(req.body);

    if (!validationErrors.isEmpty()) {
      res.sendError(UsersErrors.LOGIN_WRONG_DATA);
      return next();
    }

    let user = await this.userService.loginUser(loginUserDTO);

    if (!user.isSuccess) {
      res.sendError(user.error);
      return next();
    }

    let response = new UserLoginSimpleModel(user.data);

    res.status(200).json(response);
    next();
  }

  async createVerificationCode(req, res, next) {
      let validationErrors = validationResult(req.body);
      let createVerificationCodeDTO = new CreateVerificationCodeDTO(req.body);

      console.log(req.body);

      if (req.user.role != "ADMIN") {
          res.sendStatus(403);
          return next();
      }

      if (!validationErrors.isEmpty()) {
          res.sendError(UsersErrors.VERIFICATION_CODE_WRONG_DATA);
          return next();
      }

      let verificationCodes = await this.userService.createVerificationCode(createVerificationCodeDTO);

      if (!verificationCodes.isSuccess) {
          res.sendError(verificationCodes.error);
          return next();
      }

      let response = verificationCodes.data.map((code) => { return new VerificationCodeSimpleModel(code) } );

      res.status(201).json(response);
      next();
  }

  async getClassUsers(req, res, next) {
      let validationErrors = validationResult(req.body);
      let className = req.params.className;

      if (req.user.role != "ADMIN") {
          res.sendStatus(403);
          return next();
      }

      let users = await this.userService.getClassUsers(className);

      let response = users.data.map( user => new UserSimpleModel(user) );

      res.status(200).json(response);
      next();
  }

  async getClasses(req, res, next) {
      let validationErrors = validationResult(req.body);

      if (req.user.role != "ADMIN") {
          res.sendStatus(403);
          return next();
      }

      let classes = await this.userService.getClasses();

      let response = classes.data;

      res.status(200).json(response);
      next();
  }

  registerRoutes(router) {
    router.post('/verificationcode', CreateVerificationCodeDTO.validate(), this.createVerificationCode.bind(this));
    router.get('/admin/classes', CreateVerificationCodeDTO.validate(), this.getClasses.bind(this));
    router.get('/admin/:className/users', CreateVerificationCodeDTO.validate(), this.getClassUsers.bind(this));
    router.post('/user', CreateUserDTO.validate(), this.createUser.bind(this));
    router.post('/login', LoginUserDTO.validate(), this.loginUser.bind(this));
  }
}

module.exports = UserController;
