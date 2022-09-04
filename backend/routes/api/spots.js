const express = require('express')

const { Spot, Review, sequelize, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors, } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const review = require('../../db/models/review');

const router = express.Router()

router.get('/', async (req, res, next) => {
    
    let result = []


    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (!page) {page = 1}
    if (!size) {size = 20}

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}

    if (size >= 0 && size <= 20) {
        pagination.limit = size
    } else {
        const err = new Error("Size must be greater than or equal to 20");
        err.status = 400;

        res.status(400).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err);
    }
    if (page >= 0 && page <= 10) {
        pagination.offset = size * (page - 1)
    } else {
        const err = new Error("Page must be greater than or equal to 0");
        err.status = 400;

        res.status(400).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err);
    }


   
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
        ...pagination,

    })

    console.log(Spots)

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
    // console.log(result)

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
        Spots: result,
        page,
        size
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
    const { spotId } = req.params
    const { url, preview } = req.body

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })
    console.log(spot)
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

    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body


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

    return res.json({ spot })
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params

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

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params


    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        raw: true

    })

    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
        raw: true
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    const result = []
    if (req.user.id !== spot.ownerId) {
        for (let booking of bookings) {

            const obj = {}
            obj.spotId = booking.spotId
            obj.startDate = booking.startDate
            obj.endDate = booking.endDate

            result.push(obj)
        }

    }
    if (req.user.id === spot.ownerId) {
        for (let booking of bookings) {
            let obj = {}
            const user = await User.findOne({
                where: {
                    id: booking.userId
                }
            })

            booking.User = user
            result.push(booking)

        }
    }



    return res.json({
        Bookings: result
    })
})



router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params
    const { startDate, endDate } = req.body


    const spot = await Spot.findOne({
        where: {
            id: spotId
        },
        raw: true
    })

    if (req.user.id === spot.ownerId) {
        const err = new Error("Cannot book, if you are the owner of the property")
        err.status = 403

        res.status(403).json({
            "message": err.message,
            "statusCode": 403
        })

        next(err)
    }


    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        raw: true
    })



    for (let booking of bookings) {
        let bookedEndTime = new Date(booking.endDate)
        let bookedEndTimeMs = bookedEndTime.getTime()

        let bookedStartTime = new Date(booking.startDate)
        let bookedStartTimeMs = bookedStartTime.getTime()

        let startTime = new Date(startDate)
        let startTimeMs = startTime.getTime()

        let endTime = new Date(endDate)
        let endTimeMs = endTime.getTime()

        const err = new Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        if (startTimeMs < bookedEndTimeMs && startTimeMs > bookedStartTimeMs) {
            err.errors = {
                "startDate": "Start date conflicts with an existing booking"
            }
            res.status(403).json({
                "message": err.message,
                "statusCode": err.status,
                "errors": err.errors
            })
            next(err)
        }

        if (endTimeMs > bookedStartTimeMs && endTimeMs < bookedEndTimeMs) {
            err.errors = {
                "endDate": "End date conflicts with an existing booking"
            }
            res.status(403).json({
                "message": err.message,
                "statusCode": err.status,
                "errors": err.errors
            })
            next(err)
        }


    }

    const booking = await Booking.create({
        spotId,
        userId: req.user.id,
        startDate,
        endDate
    })

    return res.json({
        booking
    })
})


router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;

    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    // const user = await User.findOne({
    //     where: {
    //         id: review.userId
    //     },
    //     raw: true
    // })

    // console.log(user)

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        return next(err)
    }

    return res.json({
        Reviews: reviews
    })
})


router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;

    const { review, stars } = req.body;

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId
        },
        raw: true
    })

    for (let review of reviews) {
        if (req.user.id === review.userId) {
            const err = new Error("User already has a review for this spot");
            err.status = 403;

            res.status(403).json({
                "message": err.message,
                "statusCode": 403
            })

            next(err)
        }
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spotId,
        review,
        stars
    })

    const newReviewJson = newReview.JSON()

    res.json({ ...newReviewJson })
})


module.exports = router
