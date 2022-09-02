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

    if(!bookings){
        const err = new Error('Current user has No bookings')
        err.status = 404
        res.status(404).json({
            "message": err.status,
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




module.exports = router
