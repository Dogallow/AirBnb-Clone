// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

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
    options.tableName = 'Spots'
     await queryInterface.bulkInsert(options, [{
    ownerId: 1,
    address: "Eagle Nebula",
    city: "Narnia",
    state: "Pennsylvania",
    country: "United States of America",
    lat: 40.05342,
    lng: -111.224233,
    name:"The Fairy of Eagle Nebula",
    description: "The Eagle Nebula that might be described as a gigantic alien fairy.",
    price: 444
   },
  {
     ownerId: 2,
    address: "Just south of the Tarantula Nebula.",
     city: "Kansas",
     state: "Missouri",
     country: "United States of America",
     lat: 42.05342,
     lng: 150.4249,
     name: "N159",
    description: "A stellar nursery within the Large Magellanic Cloud.",
     price: 999999
  },
  {
   ownerId: 2,
    address: "180 million light-years away",
   city: "San Francisco",
   state: "California",
    country: "galaxy NGC 1961",
   lat: 50.7635,
   lng: 288.998908,
    name: "NGC 1961",
    description: "The galaxy NGC 1961 unfurls its gorgeous spiral arms",
   price: 44564
  },
  {
   ownerId: 1,
    address: "161,000 light-years away",
   city: "San Francisco",
   state: "California",
    country: "Large Magellanic Cloud galaxy",
   lat: 59.7635,
   lng: 300.444,
    name: "30 Doradus",
    description: "Nicknamed the Tarantula Nebula",
   price: 100000
  },
  {
   ownerId: 3,
    address: "Distant star",
   city: "San Francisco",
    state: "Lizard constellation",
    country: "Lacerta",
   lat: 59.7635,
   lng: 300.444,
    name: "TYC 3203-450-1",
    description: "The star is much closer than the much more distant galaxy.",
   price: 100000
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
    options.tableName = 'Spots'
     await queryInterface.bulkDelete(options)
  }
};

// , null, {}  ----------- Cut from the bulkDelete method and replaced with the options object
