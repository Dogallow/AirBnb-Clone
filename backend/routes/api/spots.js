const express = require('express')

const { Spot, Review, sequelize, SpotImage, User, Booking, ReviewImage } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors, } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const review = require('../../db/models/review');
const { Op } = require("sequelize");
const {singleMulterUpload, singlePublicFileUpload} = require('../../awsS3')

const router = express.Router()

router.get('/', async (req, res, next) => {
    
    let result = []


    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (!page) {page = 1}
    if (!size) {size = 20}

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}
    const where = {};

    if (minPrice) {
        if ( parseFloat(minPrice) <= 0){
            const err = new Error("Min Price must be greater than 0")
            err.status= 400

            res.json({
                "message": err.message,
                "statusCode": err.status
            })

            return next(err)

        }
        where.price = {
            [Op.gte] : parseFloat(minPrice)
        }
    }

    if(maxPrice) {
        if (parseFloat(maxPrice) <= 0) {
            const err = new Error("Max Price must be greater than 0")
            err.status = 400

            res.json({
                "message": err.message,
                "statusCode": err.status
            })

            return next(err)

        }
        where.price = {
            [Op.lte] : parseFloat(maxPrice)
        }
    }
    
    if(maxPrice && minPrice){
        where.price = {
            [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)]
        }
    }

    if (minLat) {
        if (typeof parseFloat(minLat) !== 'number') {
            const err = new Error("Min Latitude is invalid")
            err.status = 400;

            res.json({
                "message": err.message,
                "statusCode": err.status
            })

            return next(err);
        }

        where.lat = {
            [Op.gte] : parseFloat(minLat)
        }
    }

    if (maxLat) {
        if (typeof parseFloat(maxLat) !== 'number') {
            const err = new Error("Max Latitude is invalid")
            err.status = 400;

            res.json({
                "message": err.message,
                "statusCode": err.status
            })

            return next(err);
        }

        where.lat = {
            [Op.gte]: parseFloat(maxLat)
        }
    }

    if (minLat && maxLat) {
        where.lat = {
            [Op.between]: [parseFloat(minLat), parseFloat(maxLat)]
        }
    }


    if (minLng) {
        if (typeof parseFloat(minLng) !== 'number') {
            const err = new Error("Min Longitude is invalid")
            err.status = 400;

            res.json({
                "message": err.message,
                "statusCode": err.status
            })

            return next(err);
        }

        where.lng = {
            [Op.gte] : parseFloat(minLng)
        }
    }

    if (maxLng) {
        if (typeof parseFloat(maxLng) !== 'number') {
            const err = new Error("Max Longitude is invalid")
            err.status = 400;

            res.json({
                "message": err.message,
                "statusCode": err.status
            })

            return next(err);
        }

        where.lng = {
            [Op.gte]: parseFloat(maxLng)
        }
    }

    if (minLng && maxLng) {
        where.lng = {
            [Op.between]: [parseFloat(minLng), parseFloat(maxLng)]
        }
    }
   
    
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
        where,
        ...pagination,
        raw: true
    })

    const spotCount = await Spot.findAll({
        raw: true
    })
    // Declare a new var equal to []
    // iterate over spots array
    // take the id of spot
    // as we loop over spots query the review model with an where clause looking for a spot with the spotid
    // let newArr = []
    // Spots.forEach( async (spot)=>{
    for (let spot of Spots) {
        const review = await Review.findAll({

            where: {
                spotId: spot.id
            },
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
            raw: true
        })
        spot.avgRating = parseFloat(review[0].avgRating)
        result.push(spot)
    }


    const preview = await SpotImage.findAll({

        attributes: ['preview', 'url', 'spotId'],

    })


    let newSpot = []
    let listOfReviews = []



    for (let spot of result) { 

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

    return res.json({
        Spots: result,
        page,
        size,
        spotCount: spotCount.length
    })
})

router.get('/current', requireAuth, async (req, res, next) => {
    
    const result = []
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
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
        
        let num = review[0].avgRating

        num = parseFloat(num)
        
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
    
    const spotJson = spot.toJSON()
    spotJson.avgRating = parseFloat(avg.avgRating)
    spotJson.numReviews = avg.numReviews

    return res.json({
        ...spotJson
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

    const spotJson = spot.toJSON()

    return res.status(201).json({ ...spotJson })
})

router.post('/:spotId/images',singleMulterUpload("url"), requireAuth, async (req, res, next) => {
    const { spotId } = req.params
    const { url, preview } = req.body
    const spotImageUrl = await singlePublicFileUpload(req.file)
    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
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
        'url': spotImageUrl,
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

    await spot.save()
    const spotJson = spot.toJSON()

    return res.json({ ...spotJson })
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

    if (!bookings){
        return []
    }

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
            
            obj.id = booking.id
            obj.spotId = booking.spotId
            obj.startDate = booking.startDate
            obj.endDate = booking.endDate
            obj.userId = booking.userId
            

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
    
    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
        return
    }
    if (req.user.id === spot.ownerId) {
        const err = new Error("Cannot book, if you are the owner of the property")
        err.status = 403

        res.status(403).json({
            "message": err.message,
            "statusCode": 403
        })

        next(err)
        return
    }



    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        raw: true
    })

    const booking = await Booking.create({
        spotId,
        userId: req.user.id,
        startDate,
        endDate
    })

    const bookingJson = booking.toJSON();

    return res.json({
        ...bookingJson
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

        return next(err);
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

            return next(err)
        }
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spotId,
        review,
        stars
    })

    const newReviewJson = newReview.toJSON()

   return res.json({ ...newReviewJson })
})


module.exports = router
