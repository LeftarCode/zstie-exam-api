'use strict';

module.exports = function (sequelize, DataTypes) {
    /**
     * @memberOf DB
     */
    let VerificationCode = sequelize.define('VerificationCode', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        className: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    VerificationCode.createVerificationCode = async function (classNames) {

        let verificationCodes = [];
        for (let i = 0; i < classNames.length; i++) {
            verificationCodes.push({
                className: classNames[i],
                content: Math.random().toString(36).substr(2)
            });
        }

        return DB.VerificationCode.bulkCreate(verificationCodes);
    };

    VerificationCode.getByContent = async function (content) {
        return DB.VerificationCode.findOne({
            where: {
                content: content
            }
        })
    };

    VerificationCode.deleteByContent = async function (content) {
        return DB.VerificationCode.destroy({
            where: {
                content: content
            }
        })
    }

    return VerificationCode;
};
