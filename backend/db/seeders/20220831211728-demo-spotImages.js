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
       url: 'https://apod.nasa.gov/apod/image/2209/FairyPillar_Hubble_960.jpg',
      preview:true
    },
    {
      spotId: 2,
      url: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/gsfc_20171208_archive_e000226_orig.jpg',
      preview:true
    },
    {
      spotId: 1,
      url: 'https://apod.nasa.gov/apod/image/1402/eagle_kp09_960.jpg',
      preview:true
    },
    {
      spotId: 3,
      url: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/hubble_ngc1961_wfc3_1flat_cont_final.jpg',
      preview:true
    },
    {
      spotId: 4,
      url: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/stsci-01ga76rm0c11w977jrhgj5j26x.png',
      preview:true
    },
    {
      spotId: 5,
      url: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/gsfc_20171208_archive_e000084_orig.jpg',
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
