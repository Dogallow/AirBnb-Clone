const express = require('express');

const { Review, User, ReviewImage, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        raw: true
    })

    let result = [];
    for (let review of reviews){
        
        const user = await User.findOne({
            where: {
                id: review.userId
            },
            raw: true
        })
        review.User = user;

        const spot = await Spot.findOne({
            where: {
                id: review.spotId
            },
            raw: true
        })
        
        const images = await SpotImage.findOne({
            where: {
                preview: true
            }
        })
        if ( !images ) {
            spot.previewImage = "There is No Image"
        } else {
            spot.previewImage = images.url
        }

        review.Spot = spot;

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            }
        })

        review.ReviewImage = reviewImages;

        result.push(review);
    }



    return res.json({ Reviews: result })
})

router.get('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    
    const review = await Review.findOne({
        where: {
            id: reviewId
        },
        raw: true
    })

    if ( !review ) {
        const err = new Error("Review couldn't be found");
        err.status = 404;

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err);
    }

    if ( review.userId !== req.user.id ) {
        const err = new Error("Review must belong to the current user");
        err.status = 403;

        res.status(403).json({
            "message": err.message,
            "statusCode": 403
        })

        next(err);
    }

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId
        },
        raw: true
    })

    if (reviewImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;

        res.status(403).json()
    }


    const reviewImage = await ReviewImage.create({
        reviewId,
        url
    })

    res.json({ reviewImage })
})




module.exports = router;
