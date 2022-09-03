const express = require('express')

const {Booking, Spot, SpotImage} = require('../../db/models')
const {requireAuth} = require('../../utils/auth')

const router = express.Router()

router.get('/current', requireAuth, async (req,res,next) => {

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id,
        },
        
        raw: true
    })

    if(!bookings.length){
        const err = new Error('Current user has No bookings')
        err.status = 404
        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })
        next(err)
    }

    const result = []
    for (let booking of bookings){
        console.log(booking.spotId)
        const spot = await Spot.findOne({
            where: {
                id: booking.spotId
            },
            raw:true
            
        })

        const preview = await SpotImage.findOne({
            where: {
                preview:true
            },
            raw: true
        })
        
        if(preview){
            spot.previewImage = preview.url
        } else {
            spot.previewImage = "No Preview Image"
        }
        booking.Spot = spot
        result.push(booking)
    }



  
    
    return res.json({
        Bookings: result
    })
})

router.put('/:bookingId', requireAuth, async (req,res, next) => {
    const {bookingId} = req.params
    const {startDate, endDate} = req.body

    const booking = await Booking.findOne({
        where: {
            id: bookingId
        },
        
    })


    console.log(booking)
    
    if(!booking) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }
    if(req.user.id !== booking.userId){
        const err = new Error("Can only edit your own booking")
        err.status= 403
        res.status(403).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    const currentDate = new Date()
    const bookingEndDate = new Date(endDate)
    if(bookingEndDate < currentDate){
        const err = new Error("Past bookings can't be modified")
        err.status = 403
        res.status(403).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        },
        raw:true
    })

    for (let booking of bookings){
        let bookedStart = new Date(booking.startDate)
        let bookedEnd = new Date(booking.endDate)
        let start = new Date(startDate)
        let end = new Date(endDate)

        const err = new Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403

        if(start < bookedEnd && start > bookedStart){
            err.errors = {
                "startDate": "Start date conflicts with an existing booking",
            }
            res.status(403).json({
                "message": err.message,
                "errors": err.errors,
                "statusCode": 403
            })

            next(err)
        }

        if(end > bookedStart && end < bookedEnd){
            err.errors = {
                "endDate" : "End date conflicts with an existing booking"
            }

            res.status(403).json({
                "message": err.message,
                "errors": err.errors,
                "statusCode":403
            })

            next(err)
        }


    }


    booking.set({
        startDate,
        endDate
    })

    await booking.save()

    return res.json({booking})
})




module.exports = router
