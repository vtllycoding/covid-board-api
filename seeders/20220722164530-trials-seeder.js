'use strict';
const { getTrials, getCriterias } = require('../seeder');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('trials', await getTrials(), {});
    await queryInterface.bulkInsert('criterias', await getCriterias(), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('trials', null, {});
    await queryInterface.bulkDelete('criterias', null, {});
  }
};
