'use strict';
const { body } = require('express-validator/check');

class CreateVerificationCode {

    /**
     *
     * @param {*} requestBody - request body
     * @param {String} requestBody.className - user's user name
     */
    constructor(requestBody) {
        this.classNames = requestBody.classNames;
    }

    static validate() {
        return [
            body('className', 'className is required and must be minimum 8 length').isLength({ min: 2, max: 2 })
        ];
    }
}

module.exports = CreateVerificationCode;