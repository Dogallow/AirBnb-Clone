const express = require('express')

const { Spot,Review, sequelize, SpotImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll({
        // attributes: {
        //     include: [
        //         'id',
        //         [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        //     ],
            
        // },
        // include: [
        //     {
        //         model: Review,
        //         attributes: []
        //     },
            
        // ],
        // group: ['Spot.id'],
    
})

    const reviews = await Review.findAll({
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
            ]
        },
        group: ['SpotId']
    })

    const preview = await SpotImage.findAll({

        attributes: ['preview', 'url', 'spotId'],
       
    })


    let newSpot = []
    let listOfReviews = []
    for (let review of reviews){
        listOfReviews.push(review.toJSON())
    }
    

    let index = 0
    for (let spot of Spots) {
        let spots = spot.toJSON()
        console.log(listOfReviews[index])
        spots.avgRating = listOfReviews[index].avgRating

            for (let image of preview) {
                let newImage = image.toJSON()

                if (newImage.preview === true && newImage.spotId === spots.id) {
                    spots.previewImage = newImage.url
                }

            }

        if (spots.previewImage === undefined) {
            spots.previewImage = "No Image provided"
        }

        index++
        newSpot.push(spots)
    }

    res.json({
       Spots: newSpot
    })
})

module.exports = router
