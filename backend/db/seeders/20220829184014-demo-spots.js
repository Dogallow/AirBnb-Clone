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
    address: "Eagle Nebula",
    city: "Narnia",
    state: "Pennsylvania",
    country: "United States of America",
    lat: 40.05342,
    lng: -111.224233,
    name:"The Fairy of Eagle Nebula",
    description: "Featured here is one of several striking dust pillars of the Eagle Nebula that might be described as a gigantic alien fairy.",
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
    description: "Nicknamed the Tarantula Nebula for the appearance of its dusty filaments in previous telescope images, the nebula has long been a favorite for astronomers studying star formation. In addition to young stars, Webb reveals distant background galaxies, as well as the detailed structure and composition of the nebula’s gas and dust.",
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
