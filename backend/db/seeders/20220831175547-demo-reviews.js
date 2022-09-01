'use strict';

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
   await queryInterface.bulkInsert('Reviews', [
    {
      userId: 2,
      spotId: 1,
      review: "Great Location",
      stars: 5
    },
    {
      userId: 3,
      spotId: 2,
      review: "Eh, Could be better",
      stars: 3
    },
    {
      userId: 1,
      spotId: 3,
      review: 'Awesome',
      stars: 4
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};