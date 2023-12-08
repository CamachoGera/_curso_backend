'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('tasks', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('tasks', 'userId');
  }
};
