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
   options.tableName = 'SpotImages'
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
       url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1671556318/cloudinary-example-1_nlapq9.webp',
      preview:true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1671559486/cloudinary-example-4_rjwuvc.webp',
      preview:true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1671559484/cloudinary-example-3_b3ng75.webp',
      preview:false
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1671559251/cloudinary-example-2_wcqaro.webp',
      preview:true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1671559595/cloudinary-example-5_xsdhzn.webp',
      preview:true
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1671559641/cloudinary-example-6_pwgr0s.webp',
      preview:true
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1671559688/cloudinary-example-7webp_qn69gh.webp',
      preview:true
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
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options)
    // await queryInterface.bulkDelete('SpotImages',null, {})
  }
};
