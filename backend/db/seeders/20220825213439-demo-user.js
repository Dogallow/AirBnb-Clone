// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code


const bcrypt = require("bcryptjs")

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
   options.tableName = 'Users'
     await queryInterface.bulkInsert(options,[
    {
      firstName: 'Candy',
      lastName: 'Crush',
      username: "candyCrush",
      email: "c4ndyCrush@gmail.com",
      hashedPassword: bcrypt.hashSync('password')

    },
    {
      firstName: 'Demo',
      lastName: 'lition',
      username: "Demo1",
      email: "demoMan1@gmail.com",
      hashedPassword: bcrypt.hashSync('demo1password')

    },
    {
      firstName: 'Demo',
      lastName: 'litionExpert',
      username: "Demo2",
      email: "demoMan2@gmail.com",
      hashedPassword: bcrypt.hashSync('demo2password')

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
    // const Op = Sequelize.Op
    options.tableName = 'Users'
    const { Op } = require("sequelize");
      await queryInterface.bulkDelete(options)
  }


};

// , {
//   username: {
//     [Op.in]: ['candyCrush', 'Demo1', 'Demo2']
//   },
//   email: {
//     [Op.in]: ['c4ndyCrush@gmail.com', 'demoMan1@gmail.com', 'demoMan2@gmail.com']
//   }
// }
//  Not sure if this is needed. Took it out of the bulk delete and replaced it with the options object
