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
  }, {
    ownerId: 1,
    address: "Zmudosowski State Beach",
    city: "Watsonville",
    state: "California",
    country: "United States of America",
    lat: 0,
    lng: 0,
    name: "SPECTACULAR OCEAN-FRONT HOME IN MONTEREY BAY",
    description: "California is known for some of the most beautiful beaches in the world and Pajaro Dunes is no exception. Positioned on the oceanfront, this 3,000+ sq. ft home has one of the most spectacular views along the coastline and is situated on one of the most private stretches of beach in Monterey Bay. Just like us, you will be captivated by the daily views of birds, dolphins, whales, sea otters and other wildlife and your breath taken away by the incredibly beautiful evening sunsets.",
    price: 886
       }, 
       {
         ownerId: 2,
         address: "Moss Beach",
         city: "Moss Beach",
         state: "California",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Walk to the Beach from this Ocean Front Home",
         description: "Your beachfront escape awaits you.Come immerse yourself in the serenity of this Pacific Ocean retreat gracefully set in a secluded beach just 25 mins south of San Francisco. This 2 bed / 2 bath home features breathtaking ocean views and direct beach access just a few steps down.The hot tub overlooking the ocean, fire pits and a putting green complete this idyllic space.",
         price: 800
       },
       {
         ownerId: 3,
         address: "Joshua Tree National Park ",
         city: "Joshua Tree",
         state: "California",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Invisible House Joshua Tree | Modern Masterpiece",
         description: "We invite guests to experience the most unique desert home on the planet, and one of the best-known homes in the world: the Invisible House.This one of a kind masterpiece was designed by veteran film producer Chris Hanley.Featured in countless music videos, television shows and dozens of publications worldwide(including Netflix, Robb Report, Architectural Digest, Washington Post, People, Daily Mail, Dezeen, and Maxim), this sleek 5, 500 sq.ft.minimalist retreat is set on 90 breathtaking acres comprising the largest privately- owned parcel of land abutting Joshua Tree National Park.An exploration in contrasts, the mirrored 22 - story horizontal skyscraper features an entirely reflective facade that absorbs its surroundings and vanishes into the desert landscape.The juxtaposition of sleek minimalism and ancient desert terrain makes Invisible House a singularly definitive structure in blending modern architecture with the natural world.",
         price: 2973
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
    options.tableName = 'Spots'
     await queryInterface.bulkDelete(options)
  }
};

// , null, {}  ----------- Cut from the bulkDelete method and replaced with the options object
