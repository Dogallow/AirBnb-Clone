const express = require('express')

const { Spot, Review, sequelize, SpotImage, User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors, } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')

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
    for (let spot of Spots) {
        // console.log(spot.id)
        const review = await Review.findAll({

            where: {
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

router.get('/current', requireAuth, async (req, res, next) => {
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


    for (let spot of spots) {
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





    console.log(spot)

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

router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })



    return res.status(201).json({ spot })
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const {spotId} = req.params
    const { url, preview } = req.body

    const spot = await Spot.findOne({
        where : {
            id: spotId
        }
    })
    console.log(spot)
    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    // Authorization
    if(req.user.id !== spot.ownerId){
        const err = new Error("Must be the Owner of the property")
        err.status = 400

        res.json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    const image = await SpotImage.create({
        spotId,
        url,
        preview
    })

    const imageJson = image.toJSON()
    const result = {}
    result.id = imageJson.id
    result.url = imageJson.url
    result.preview = imageJson.preview

    res.json({ ...result })
})

router.put('/:spotId', requireAuth, async (req, res, next) => {

    const {spotId} = req.params
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    
    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    // Check if there is a spot
    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

         next(err)
    }

    // Authorization
    if (req.user.id !== spot.ownerId) {
        const err = new Error("Must be the Owner of the property")
        err.status = 400

        res.json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    spot.set({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    // if(address){
    //     spot.address = address
    // }

    // if(city){
    //     spot.city = city
    // }

    // if(state){
    //     spot.state = state
    // }

    // if(country){
    //     spot.country = country
    // }

    // if(lat) {
    //     spot.lat = lat
    // }

    // if(lng){
    //     spot.lng = lng
    // }

    // if(name){
    //     spot.name = name
    // } 

    // if(description){
    //     spot.description = description
    // }

    // if(price){
    //     spot.price = price
    // }

    await spot.save()

    return res.json({spot})
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const {spotId} = req.params

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    // Check if there is a spot
    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    // Authorization
    if (req.user.id !== spot.ownerId) {
        const err = new Error("Must be the Owner of the property")
        err.status = 400

        res.json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }
    console.log(spot)
    await spot.destroy()

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})



module.exports = router
