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
     await queryInterface.bulkInsert('Spots', [{
    ownerId: 1,
    address: "444 transylvania ave.",
    city: "Narnia",
    state: "Pennsylvania",
    country: "United States of America",
    lat: 40.05342,
    lng: -111.224233,
    name:"John Zelle",
    description: "No Place like home",
    price: 444
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Spots', null, {})
  }
};
