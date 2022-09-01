'use strict';


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
     await queryInterface.bulkInsert('Users',[
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
    const { Op } = require("sequelize");
      await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]:['candyCrush', 'Demo1', 'Demo2']
      },
      email:{
        [Op.in]: ['c4ndyCrush@gmail.com', 'demoMan1@gmail.com', 'demoMan2@gmail.com']
      }
    })
  }


};
