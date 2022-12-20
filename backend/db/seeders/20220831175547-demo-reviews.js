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
   options.tableName = 'Reviews'
   await queryInterface.bulkInsert(options, [
    {
      userId: 2,
      spotId: 1,
      review: "Great Location",
      stars: 4
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
     ,  {
       userId: 3,
       spotId: 4,
       review: "Great...",
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
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options)
    // await queryInterface.bulkDelete('Reviews', null, {})
  }
};
