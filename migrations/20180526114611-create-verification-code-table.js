'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('VerificationCodes', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            className: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable('VerificationCodes', { force: true });
    }
};
