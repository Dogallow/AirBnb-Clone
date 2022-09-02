const express = require('express')

const { Spot,Review, sequelize, SpotImage, User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors, } = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth')

const router = express.Router()

router.get('/', async (req, res, next) => {

    let result = []
    
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
    raw: true
})

// console.log(Spots)

// Declare a new var equal to []
// iterate over spots array
// take the id of spot
// as we loop over spots query the review model with an where clause looking for a spot with the spotid
// let newArr = []
// Spots.forEach( async (spot)=>{
    for (let spot of Spots){
    // console.log(spot.id)
    const review = await Review.findAll({

        where:{
            spotId: spot.id
        },
    attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    raw: true
})
// console.log(review[0].avgRating)
spot.avgRating = review[0].avgRating
// console.log('review', review)
   result.push(spot)
   // let spotObj = spot.toJSON()
   // console.log(review[0].toJSON())
   // spotObj.avgRating = review[0].toJSON().avgRating
   // console.log(spotObj)
   // console.log(newArr)
   
   // newArr.push(spotObj)
}
console.log(result)

    // const reviews = await Review.findAll({
    //     attributes: {
    //         include: [
    //             [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
    //         ]
    //     },
    //     
    // })

    
    
    const preview = await SpotImage.findAll({

        attributes: ['preview', 'url', 'spotId'],
        
    })
    

    let newSpot = []
    let listOfReviews = []
   
    
    
    // let index = 0
    for (let spot of result) {
            // let spots = spot.toJSON()
            // console.log(listOfReviews[index])
            // spots.avgRating = 
        
                for (let image of preview) {
                        let newImage = image.toJSON()
            
                        if (newImage.preview === true && newImage.spotId === spot.id) {
                                spot.previewImage = newImage.url
                }

            }
    
        if (spot.previewImage === undefined) {
            spot.previewImage = "No Image provided"
        }
    
        // index++
        // newArr.push(spots)
    }
    
    // console.log(newArr)
    return res.json({
         Spots: result
    })
})

router.get('/current',requireAuth, async (req,res,next) => {
    console.log(req.user.id)
    const result = []
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        //   attributes: {
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
    raw: true
    })

    const preview = await SpotImage.findAll({

        attributes: ['preview', 'url', 'spotId'],

    })
    

    for (let spot of spots){
        const review = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
            raw: true

        })
        console.log(review)
        let num = review[0].avgRating
        
        num = parseFloat(num)
        console.log(num)
        spot.avgRating = num
                for (let image of preview) {
                    let newImage = image.toJSON()
        
                    if (newImage.preview === true && newImage.spotId === spot.id) {
                        spot.previewImage = newImage.url
                    }
        
                }
        
                if (spot.previewImage === undefined) {
                    spot.previewImage = "No Image provided"
                }
    }

    
    for (let spot of spots) {
        // let spots = spot.toJSON()
        // console.log(listOfReviews[index])
        // spots.avgRating = 

        // index++
        // newArr.push(spots)
    }

   return res.json({
        spots
    })
})


router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params

    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
        include: [
            { model: SpotImage },
            {
                model: User,
                as: 'Owner',
                attributes: {
                    exclude: ['email', 'hashedPassword', 'createdAt', 'updatedAt', 'username']
                }
            }
        ]
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        res.status(404).json({
            'message': err.message,
            'statusCode': err.status
        })
        next(err)
    }
    const avg = await Review.findOne({
        where: {
            spotId
        },
        attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"], [sequelize.fn('COUNT', sequelize.col('review')), 'numReviews']],
        raw: true
    })

    // const reviews = await Review.findAll({
    //     where :{spot}
    // })

    console.log(avg)
    const spotJson = spot.toJSON()
    spotJson.avgRating = parseFloat(avg.avgRating)
    spotJson.numReviews = avg.numReviews

    return res.json({
        spot: spotJson
    })
})

module.exports = router
