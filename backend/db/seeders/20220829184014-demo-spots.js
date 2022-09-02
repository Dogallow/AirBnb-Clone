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
    description: "Coolest Place in the World",
    price: 444
   },
  {
     ownerId: 2,
     address: "222 lighthouse lane",
     city: "Kansas",
     state: "Missouri",
     country: "United States of America",
     lat: 42.05342,
     lng: 150.4249,
     name: "Yellow Brick Road",
     description: "No Place like home",
     price: 999999
  },
  {
   ownerId: 2,
   address: "333 slippery slide",
   city: "San Francisco",
   state: "California",
   country: "United States of America",
   lat: 50.7635,
   lng: 288.998908,
   name: "Slip and Slide",
   description: "Funnest Place in the world",
   price: 44564
  },
  {
   ownerId: 1,
   address: "111 heaven lane",
   city: "San Francisco",
   state: "California",
   country: "United States of America",
   lat: 59.7635,
   lng: 300.444,
   name: "Stairway to Heaven",
   description: "Best Place in the world",
   price: 100000
  },
  ])
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
