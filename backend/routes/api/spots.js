const express = require('express')

const { Spot,Review, sequelize, SpotImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll({
        attributes: {
            include: [
                'id',
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
            ],
            
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            
        ],
        group: ['Spot.id'],
    
})

// Declare a new var equal to []
// iterate over spots array
// take the id of spot
// as we loop over spots query the review model with an where clause looking for a spot with the spotid

    // const reviews = await Review.findAll({
    //     attributes: {
    //         include: [
    //             [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
    //         ]
    //     },
    //     
    // })

    const newArr = []
    Spots.forEach( async (spot)=>{
        const review = await Review.findAll({
            where:{
                spotId: spot.id
            },
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
            ]
        },
    })
    
    let spotObj = spot.toJSON()
        spotObj.avgRating = review[0].toJSON().avgRating
        // console.log(spotObj)
        newArr.push(spotObj)
    })
    console.log(newArr)

    const preview = await SpotImage.findAll({

        attributes: ['preview', 'url', 'spotId'],
       
    })


    let newSpot = []
    // let listOfReviews = []
    // for (let review of reviews){
    //     listOfReviews.push(review.toJSON())
    // }
    

    // // let index = 0
    // for (let spot of Spots) {
    //     let spots = spot.toJSON()
    //     // console.log(listOfReviews[index])
    //     // spots.avgRating = 

    //         for (let image of preview) {
    //             let newImage = image.toJSON()

    //             if (newImage.preview === true && newImage.spotId === spots.id) {
    //                 spots.previewImage = newImage.url
    //             }

    //         }

    //     if (spots.previewImage === undefined) {
    //         spots.previewImage = "No Image provided"
    //     }

    //     // index++
    //     newSpot.push(spots)
    // }

    res.json({
       newArr
    })
})

module.exports = router
