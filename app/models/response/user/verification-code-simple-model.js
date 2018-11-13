'use strict';

class VerificationCodeSimpleModel {
    /**
     *
     * @param {*} model - user model
     * @param {string} model.className - user class name
     * @param {string} model.code - user code
     */
    constructor(model) {
        this.className = model.className;
        this.code = model.content;
    }
}

module.exports = VerificationCodeSimpleModel;
