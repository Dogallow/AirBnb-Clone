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
      username: "candyCrush",
      email: "c4ndyCrush@gmail.com",
      hashedPassword: bcrypt.hashSync('password')

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
    const Op = Sequelize.Op
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]:['candyCrush']
      },
      email:{
        [Op.in]: ['c4ndyCrush@gmail.com']
      }
    })
  }


};
