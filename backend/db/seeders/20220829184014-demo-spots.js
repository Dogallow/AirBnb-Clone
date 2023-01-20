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
    address: "Jenner Boulevard",
    city: "Jenner",
    state: "California",
    country: "United States of America",
    lat: 0,
    lng: 0,
       name: "OnTheRocks•Architectural•Estate•Dramatic Ocean VUs",
       description: "OnTheRocks is a Frank Lloyd Wright inspired modern California Ranch w/ subtle Prairie & & International architectural design.",
    price: 1499
   },
  {
     ownerId: 2,
    address: "Big Rock Beach",
     city: "Malibu",
     state: "California",
     country: "United States of America",
     lat: 0,
     lng: 0,
    name: "Stunning oceanfront beach house with balcony, grill, & fireplaces - snowbirds OK",
    description: "Indulge in coastal reverie at the Big Rock Seaside Beach House.",
     price: 844
  },
  {
    
   ownerId: 2,
    address: "Law Street",
   city: "San Diego",
   state: "California",
    country: "United States of America",
   lat: 0,
   lng: 0,
    name: "Sunset House - Panoramic Ocean Views, Pool, Hot Tub, BBQs, Rooftop Deck",
    description: "This condo features floor-to-ceiling windows in the living room to maximize the breathtaking views of the ocean.",
   price: 280
  },
  {
    
   ownerId: 1,
    address: "Cooks Beach",
   city: "Gualala",
   state: "California",
    country: "United States of California",
   lat: 0,
   lng: 0,
    name: "Oceanfront home with private hot tub, views, & close beach access",
    description: "Breathtaking views of the ocean await at this incredible oceanfront home. With a private hot tub overlooking the water a spacious deck and grill, the view can be enjoyed at every turn.",
   price: 457
  },
  {
    
   ownerId: 3,
    address: "Mission Beach",
   city: "San Diego",
    state: "California",
    country: "United States",
   lat: 0,
   lng: 0,
    name: "Full-Floor Penthouse ★ Ocean Front ★ A/C",
    description: "Stunning 3 br + 2 ba full-floor Penthouse located on the Ocean in the heart of Mission Beach.",
   price: 1050
  }, {
    
    ownerId: 1,
    address: "Zmudosowski State Beach",
    city: "Watsonville",
    state: "California",
    country: "United States of America",
    lat: 0,
    lng: 0,
    name: "SPECTACULAR OCEAN-FRONT HOME IN MONTEREY BAY",
    description: "California is known for some of the most beautiful beaches in the world and Pajaro Dunes is no exception. This 3,000+ sq. ft home has one of the most spectacular views along the coastline.",
    price: 886
       }, 
       {
        
         ownerId: 2,
         address: "Moss Beach Street",
         city: "Moss Beach",
         state: "California",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Walk to the Beach from this Ocean Front Home",
         description: "Your beachfront escape awaits you.Come immerse yourself in the serenity of this Pacific Ocean retreat gracefully set in a secluded beach just 25 mins south of San Francisco.",
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
         description: "We invite guests to experience the most unique desert home on the planet, and one of the best-known homes in the world: the Invisible House.",
         price: 2973
       },
       {
         ownerId: 3,
         address: "Oregon Coast",
         city: "Rockaway Beach",
         state: "Oregon",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "NEW 6400 SQFT BEACH MANSION, OCEAN VIEWS, SLEEP 25",
         description: "Reserve now for your luxury year round gathering at IBB Beach Mansion, possibly the largest house available for rent on the Oregon Coast with incredible panoramic ocean views from every room and a 2500 sq ft deck.",
         price: 979
       },
       {
        
         ownerId: 2,
         address: "Burnet County",
         city: "Rockaway Beach",
         state: "Texas",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Bavarian Castle nestled in the Texas Hill Country",
         description: "Just minutes from several Highland Lakes and conveniently located 45 minutes NW of Austin, TX, resides a ​14,000 square foot Bavarian inspired castle where you can be a King or a Queen for the night.",
         price: 1518
       },
       {
        
         ownerId: 2,
         address: "North Lawrence Ave.",
         city: "North Lawrence",
         state: "Ohio",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "The Stables",
         description: "Experience excitement, luxury and relaxation in Ohio's ultimate vacation home! Featuring endless outdoor and indoor activities for all ages, this stunning home truly has it all!",
         price: 1518
       },
       {
        
         ownerId: 1,
         address: "Zion Mountains",
         city: "Hurricane",
         state: "Utah",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "EcoFriendly Cabin! Zion without the crowds.",
         description: "This extraordinary A-frame cabin has everything glampers will need to have an unforgettable adventure in the stunning canyons of Utah. It has a unique feature that will surely amaze and delight guests.",
         price: 175
       },
       {
        
         ownerId: 1,
         address: "Grand Canyon National Park",
         city: "Williams",
         state: "Arizona",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Stargazing Grand Canyon Modern Tiny Home Cabin",
         description: "Coming to the Grand Canyon? Looking for the perfect spot to see every star in the Milky Way? We are the Stargazing 180sq ft Tiny Home.Our off- grid cabin is located just 30mins from Grand Canyon National Park.",
         price: 236
       },
       {
        
         ownerId: 1,
         address: "Jónskvísl",
         city: "Kirkjubæjarklaustur",
         state: "Southern Region",
         country: "Iceland",
         lat: 0,
         lng: 0,
         name: "Fossar Cabin",
         description: "Our cozy cabin is located in a cove by a lava field and a small creek. It is 44m2 groundfloor and was built in 1962 and I renovated it in 2015. It is located on our farm Fossar , 15km away from village Kirkjubæjarklaustur by road 204.",
         price: 271
       },
       {
        
         ownerId: 3,
         address: "Key West Isles",
         city: "Key West",
         state: "Florida",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Tiki Suites ~ The Grand Tiki",
         description: "Come relax and enjoy the beautiful and serene waters of Key West in a truly unique way!",
         price: 799
       },
       {
        
         ownerId: 3,
         address: "Cedarwood Ave.",
         city: "Tybee Island",
         state: "Georgia",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "The Alley at North Beach - Private Bowling Alley and Heated Pool!",
         description: "Historic 5 Cedarwood Ave was originally constructed in 1910 as a library/bowling alley for Fort Screven on Tybee Island. The 2022 restoration of the building included 6 bedrooms (2 master suites), 4 full bathrooms, new modern bowling lane and more.",
         price: 917
       },
       {
        
         ownerId: 3,
         address: "Dessert Lane",
         city: "Scottsdale",
         state: "Arizona",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Playhouse",
         description: "This is the #1 home in Scottsdale for families with kids of all ages.Everything is brand- new inside and out.Over $1 million was recently invested into renovating this property to create a one of a kind showpiece.",
         price: 1900
       },
       {
        
         ownerId: 3,
         address: "High Mountain Lane",
         city: "El Prado",
         state: "New Mexico",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Phoenix East Wing - Experience off-grid luxury",
         description: "The Phoenix official Earthship cannot be compared to any other rental in this world. This home’s jungle greenhouse creates its own microclimate in the high mountain desert and is completely off-the-grid.",
         price: 270
       },
       {
        
         ownerId: 3,
         address: "Tom Miner Basin",
         city: "Emigrant",
         state: "Montana",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Historic Stone Schoolhouse in Tom Miner",
         description: "Located in Tom Miner Basin, MT, a 30 minute drive to the North Entrance of Yellowstone Park. Wake up to incredible views, wildlife, hiking, fishing, soak in the hot springs, cross-country skiing in winter, all minutes away."
         price: 175
       },
       {
        
         ownerId: 3,
         address: "Choctaw Trail",
         city: "Westcliffe",
         state: "Colorado",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "Casa Del Barranco",
         description: "Casa Del Barranco (House on a Cliff) is the quintessential description of this Santa Fe-style home. Located on 10+ private acres, it sits on a small bluff overlooking a scenic, rocky ravine w/ seasonal creek meandering thru the walls of the ravine.",
         price: 165
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
    options.tableName = 'Spots'
     await queryInterface.bulkDelete(options)
  }
};

// , null, {}  ----------- Cut from the bulkDelete method and replaced with the options object
