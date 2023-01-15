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
       description: "OnTheRocks is a Frank Lloyd Wright inspired modern California Ranch w/ subtle Prairie & & International architectural design; perched on a promontory overlooking cove w/ jaw dropping ocean views and mesmerizing - audible crashing white water waves. Complete with spa, BBQ, dry/wet sauna, chefs kitchen, lux bedding and linens, Le Creuset crockery, Mauviel stainless steel cookware, Viking appliances, Wolf small kitchen appliances, Jura Espresso Machine with frother, WIFI, streaming Roku & Alexa .",
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
    description: "This condo features floor-to-ceiling windows in the living room to maximize the breathtaking views of the ocean. You will love your stay in this conveniently located condo in the heart of Pacific Beach with restaurants and shops within easy walking distance and just minutes to having your toes in the sand. You will never miss a sunset here! The open California-style kitchen is fully equipped for cooking and eating comfortably at home with granite countertops and stainless steel appliances.The condo sleeps a family of 5. The large bedroom features two queen size beds and a flat screen TV. The living room sofa easily converts into a queen sized bed for additional sleeping space.",
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
    description: "Breathtaking views of the ocean await at this incredible oceanfront home. With a private hot tub overlooking the water a spacious deck and grill, the view can be enjoyed at every turn. You will have a wood-burning fireplace, binoculars to get a closer look at the ocean, and a full kitchen. Privately situated on the cliffs of Gualala, you will instantly feel at peace and at home.",
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
    description: "Stunning 3 br + 2 ba full-floor Penthouse located on the Ocean in the heart of Mission Beach.  Featured highlights include a spacious open floorplan, expansive wrap around ocean front deck, fold up accordion patio doors, floor to ceiling windows, wrap around patio, sleeps 10 (8 adults max) & views galore!",
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
    description: "California is known for some of the most beautiful beaches in the world and Pajaro Dunes is no exception. Positioned on the oceanfront, this 3,000+ sq. ft home has one of the most spectacular views along the coastline and is situated on one of the most private stretches of beach in Monterey Bay. Just like us, you will be captivated by the daily views of birds, dolphins, whales, sea otters and other wildlife and your breath taken away by the incredibly beautiful evening sunsets.",
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
       {
         ownerId: 3,
         address: "Oregon Coast",
         city: "Rockaway Beach",
         state: "Oregon",
         country: "United States of America",
         lat: 0,
         lng: 0,
         name: "NEW 6400 SQFT BEACH MANSION, OCEAN VIEWS, SLEEP 25",
         description: "Reserve now for your luxury year round gathering at IBB Beach Mansion, possibly the largest house available for rent on the Oregon Coast with incredible panoramic ocean views from every room and a 2500 sq ft deck. Gather with your large family at this newly remodeled house with new furniture, new mattresses, fully stocked kitchen and many updates. After a day at the beach, relax in the new hot tub on the deck, grill your fav meal or enjoy movie night in the theater room. 3 mins drive to beach.",
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
         description: "Just minutes from several Highland Lakes and conveniently located 45 minutes NW of Austin, TX, resides a ​14,000 square foot Bavarian inspired castle where you can be a King or a Queen for the night.Whether it's the majestic scenic view of 3 counties from the balcony, the oversized living areas, or the 113 acres of State Park worthy hiking on site.We look forward to hosting you.",
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
         description: "This extraordinary A-frame cabin has everything glampers will need to have an unforgettable adventure in the stunning canyons of Utah. It has a unique feature that will surely amaze and delight guests; its wall is designed to open and close at will, offering a breathtaking view of the southern side of the Zion Mountains. The cabin is solar-powered with provisions for lighting and charging small devices. Just feet away is a gorgeous hike! Take a vacation into nature in this adorable cabin.",
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
         description: "Coming to the Grand Canyon? Looking for the perfect spot to see every star in the Milky Way? We are the Stargazing 180sq ft Tiny Home.Our off- grid cabin is located just 30mins from Grand Canyon National Park.With the absence of light and sound pollution you’ll have the most tranquil experience.Yes, you will be camping but that doesn’t mean you have to settle for mediocrity.Our modern, bougie aesthetic is the perfect glamping experience.",
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
         description: "Historic 5 Cedarwood Ave was originally constructed in 1910 as a library/bowling alley for Fort Screven on Tybee Island. The 2022 restoration of the building included 6 bedrooms (2 master suites), 4 full bathrooms, new modern bowling lane with automatic ball return and pin setter in the middle of the rental space, bright white kitchen with Carrara marble counters and island, separate mini bar, in-unit laundry, a heated pool, and private yard.",
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
         description: "We are proud to present “The Playhouse Retreat”. This is the #1 home in Scottsdale for families with kids of all ages.Everything is brand- new inside and out.Over $1 million was recently invested into renovating this property to create a one of a kind showpiece",
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
         description: "The Phoenix official Earthship cannot be compared to any other rental in this world. This home’s jungle greenhouse creates its own microclimate in the high mountain desert and is completely off-the-grid, exquisitely detailed and outfitted with modern amenities. The outer greenhouse features towering banana trees, grape vines, birds, turtles and even a fish pond. The inner living spaces are cozy and quiet. The Phoenix Earthship was featured in 2014 as one of Lonely Planet’s Top Ten Eco-Stays.",
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
         description: "Located in Tom Miner Basin, MT, a 30 minute drive to the North Entrance of Yellowstone Park. Wake up to incredible views, wildlife, hiking, fishing, soak in the hot springs, cross-country skiing in winter, all minutes away. You do have to travel 5.5 miles up a dirt road, so expect to drive on a nicely maintained dirt road for 10-15 minutes.",
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
         description: "Casa Del Barranco (House on a Cliff) is the quintessential description of this Santa Fe-style home. Located on 10+ private acres, it sits on a small bluff overlooking a scenic, rocky ravine w/ seasonal creek meandering thru the walls of the ravine. The 2200 sq ft home is situated to take advantage of unparalleled views of the Sangre de Cristo Mtns. We purchased this home & plan to reno one day...we are excited for guests to use as-is for now. It’s an artist haven & has many unique features.",
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
