'use strict';

class UserSimpleModel {
    /**
     *
     * @param {*} model - user model
     * @param {string} model.id - user id
     * @param {string} model.fullName - user's full name
     */
    constructor(model) {
        this.id = model.id;
        this.fullName = model.fullName;
    }
}

module.exports = UserSimpleModel;
