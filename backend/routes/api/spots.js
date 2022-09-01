const express = require('express')

const { Spot,Review, sequelize, SpotImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll({
        
        attributes:{
            
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
                ],
                
            ],
            
            
        },
        include : [
            {
                model: Review,
                attributes: []
            },
        ]
    })

    const preview = await Spot.findAll({
        include: [{model: SpotImage, attributes: ['url']}]
    })
    

const total = {}
    

    res.json({
        preview
    })
})

module.exports = router
