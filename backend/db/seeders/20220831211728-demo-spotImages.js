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
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
       url: 'https://images.unsplash.com/photo-1534371020656-6b85825f2b1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhbnN5bHZhbmlhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      preview:true
    },
    {
      spotId: 2,
      url: 'https://images.unsplash.com/photo-1536125434175-6c5657605fb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      preview:true
    },
    {
      spotId: 1,
      url: 'https://images.unsplash.com/photo-1605513512381-74b4f54380e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dHJhbnN5bHZhbmlhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
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
    await queryInterface.bulkDelete('SpotImages',null, {})
  }
};
