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
                model: models.Review,
                attributes: []
            },

        ],
        group: ['Spot.id']
    })

    const preview = await SpotImage.findAll({

        attributes: ['preview', 'url', 'spotId']
    })


    let newSpot = []

    for (let spot of Spots) {

        let spots = spot.toJSON()




        for (let image of preview) {
            let newImage = image.toJSON()

            if (newImage.preview === true && newImage.spotId === spots.id) {
                spots.previewImage = newImage.url
            }
        }
        if (spots.previewImage === undefined) {
            spots.previewImage = "No Image provided"
        }
        newSpot.push(spots)
    }



    const total = {
        Spots: Spots.SpotImages
    }


    res.json({
        Spots: newSpot
    })
})

module.exports = router
