'use strict';
const { body } = require('express-validator/check');

class CreateQuestionDTO {

    /**
     *
     * @param {*} question - request query
     * @param {String} question.professionCode - question profession code
     * @param {String} question.imageUrl - question profession code
     * @param {String} question.correctAnswerIndex - question profession code
     * @param {String} question.content - question profession code
     * @param {String} question.answers - question profession code
     */
    constructor(requestBody) {
        this.professionCode = requestBody.professionCode;
        this.imageUrl = requestBody.imageUrl;
        this.correctAnswerIndex = requestBody.correctAnswerIndex;
        this.content = requestBody.content;
        this.answers = requestBody.answers;
    }

    /**
     * Validate request query
     * @return {[ValidationChainBuilder]} validation chain builder
     */
    static validate() {
        return [
            body('professionCode', 'professionCode is required and it must be a string').isLength({ min: 1 }),
            body('imageUrl', 'userCode is optional').optional(),
            body('correctAnswerIndex', 'correctAnswerIndex is required and it must be numeric').isNumeric(),
            body('content', 'content is required and it must be string').isLength({ min: 1 }),
            body('answers', 'answers is required and it must be an array of string').isLength({ min: 1 }),
        ];
    }
}

module.exports = CreateQuestionDTO;
