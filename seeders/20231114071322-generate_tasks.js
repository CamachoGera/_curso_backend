'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {id: 1, description: "Mi primer Seeder", createdAt: new Date(), updatedAt: new Date()},
      {id: 2, description: "Mi primer backend en JavaScript", createdAt: new Date(), updatedAt: new Date()},
      {id: 3, description: "Mi primer año en codigo facilit", createdAt: new Date(), updatedAt: new Date()},
      {id: 4, description: "Mi primera chamba", createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('tasks', null, {});  
  }
};
