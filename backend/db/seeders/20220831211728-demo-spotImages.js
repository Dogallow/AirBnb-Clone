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
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673767528/8f4290bc-2128-44e1-b4f3-9c470c69dd95_kqpcwo.jpg',
      preview:true
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673767520/31f51177-d544-423b-baa8-9711d3223cb4_weorhr.webp',
      preview:false
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673767825/66a4178c-8c97-4a18-80fb-1da7842a2f9a_xyu1bh.jpg',
      preview:true
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673767826/3ec267ac-67a2-42f0-837a-daacd03803eb_ckyayy.webp',
      preview:false
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673767828/1234aabf-83e8-41c0-95f9-347ec3dcbb8a_ayvppg.webp',
      preview:false
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768035/5ec1e319-fafd-4827-9841-c9fd43563120_rmlc2k.jpg',
      preview:true
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768037/aa381c0f-34da-4192-8c30-f68c25dc9eae_n7x0uv.webp',
      preview:false
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768359/174f22d1-fe22-422d-91a3-d8d8e68418b9_xm5fil.jpg',
      preview:true
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768360/fc1462e3-9dfd-4eec-b6ac-e10976cd9f99_c9fb9v.webp',
      preview:false
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768361/9d1cc955-a1f9-4a1f-820b-4e320cd1401f_uipgf5.webp',
      preview:false
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768362/ed59a04a-1b2a-411d-a212-8c28103d7f1e_aqtqmb.webp',
      preview:false
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768584/144d9f91-cc3b-4fd0-bbcb-6ba94f98ef5b_kdtivm.jpg',
      preview:true
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768588/ee4c45e5-0e75-4106-9efe-4b0481a10e79_ceauhy.webp',
      preview:false
    },
    {
      spotId: 11,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768685/e0aeb5ae-0052-4738-b2a9-177ed93201e0_ho3c6z.webp',
      preview:true
    },
    {
      spotId: 11,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768683/0e022b3d-a7da-4662-acbf-46fda3a357e4_bc8sfb.jpg',
      preview:false
    },
    {
      spotId: 11,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768686/08e26938-e541-40c7-8e78-53989116af91_acfz9s.webp',
      preview:false
    },
    {
      spotId: 11,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768688/935d4544-8ca0-410e-a384-dd78ef0f7187_zkrufj.webp',
      preview:false
    },
    {
      spotId: 12,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768886/8d1e18b3-8df1-42ce-a53c-910e06e85c7f_nbserj.webp',
      preview:true
    },
    {
      spotId: 12,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768887/01773f80-f5f8-487c-9a12-b28d91eb1336_ept2ol.webp',
      preview:false
    },
    {
      spotId: 13,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768986/0fac15aa-f844-49da-a174-782e1b5cbd2b_lq9vmw.webp',
      preview:true
    },
    {
      spotId: 13,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768984/5193ddf1-bb76-4a12-b4b2-e82cfc6ed051_jrkjk9.webp',
      preview:false
    },
    {
      spotId: 13,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673768987/559de027-18ee-4bb4-a8ab-cb1684c5aa18_kzowxs.webp',
      preview:false
    },
    {
      spotId: 14,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769115/fdc40459-d3e4-4db7-b7fd-89a1439d8bfb_th5jrp.jpg',
      preview:true
    },
    {
      spotId: 14,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769116/1c0d3038-8c2e-4ab7-bf42-143a7225a083_kiu1te.webp',
      preview:false
    },
    {
      spotId: 16,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769353/f14e36d6-8c71-4def-803f-25f5cc348fa8_drg7u0.webp',
      preview:true
    },
    {
      spotId: 16,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769354/a8c40254-6c8c-4cc3-b115-286e2d5d3790_qovfmb.webp',
      preview:false
    },
    {
      spotId: 16,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769355/d1218b92-4ead-48f5-baed-2376c36a82a6_eb34ji.webp',
      preview:false
    },
    {
      spotId: 16,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769357/1df85b0f-afce-40b3-9a8c-4985d356ead1_otevyh.jpg',
      preview:false
    },
    {
      spotId: 15,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673772030/9cef5c15-9f3b-4159-99c8-bc8939013907_lq7vmg.jpg',
      preview:true
    },
    {
      spotId: 15,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673772032/1202f2be-1e1c-4fa1-8d7e-b6da558b8dc3_k0bwrf.webp',
      preview:false
    },
    {
      spotId: 17,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769464/7c6293d3-4c40-4480-9022-6aac6f46a2aa_qkksxh.webp',
      preview:true
    },
    {
      spotId: 17,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769463/8e5f7f23-5300-43f0-bf8b-ad69f9099733_m9kdre.jpg',
      preview:false
    },
    {
      spotId: 18,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769629/0a34adf9-48fb-4105-9020-7896a3adf4d6_x2eavc.webp',
      preview:true
    },
    {
      spotId: 18,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769628/0b291698-e8ab-41ba-9761-940df2f62981_vmvvuw.jpg',
      preview:false
    },
    {
      spotId: 19,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769787/8e5f8a5c_original_rhhyun.jpg',
      preview:true
    },
    {
      spotId: 19,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769788/ca6e6d2a-07f6-4980-9a78-1c68b0434f47_ml5fqa.webp',
      preview:false
    },
    {
      spotId: 20,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769889/76ebce8b-1e42-4f3e-9969-1f5391ebbe9b_npdcsl.jpg',
      preview:true
    },
    {
      spotId: 20,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769790/a82f01fa_original_jt8wgk.webp',
      preview:false
    },
    {
      spotId: 20,
      url: 'https://res.cloudinary.com/dpbd7etx9/image/upload/v1673769890/9766fd5c-9302-45b0-b26b-6f622994354f_i1svqm.webp',
      preview:false
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
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options)
    // await queryInterface.bulkDelete('SpotImages',null, {})
  }
};
