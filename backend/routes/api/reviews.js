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
    
    if(!reviews){
        const err = new Error("Current user has no reviews")
    }
    
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

        if(spot){

            console.log(spot)
            const images = await SpotImage.findOne({
                where: {
                    preview: true,
                    spotId: spot.id
                }
            })
            if ( !images ) {
                spot.previewImage = "There is No Image"
            } else {
                spot.previewImage = images.url
            }
    
            review.Spot = spot;
        }

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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
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

        return next(err);
    }

    
    
    if ( review.userId !== req.user.id ) {
        const err = new Error("Review must belong to the current user");
        err.status = 403;

        res.status(403).json({
            "message": err.message,
            "statusCode": 403
        })

        return next(err);
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

        res.status(403).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err);
    }


    const reviewImage = await ReviewImage.create({
        reviewId,
        url
    })

    const reviewImageJson = reviewImage.toJSON();
    const obj = {}
    obj.id = reviewImageJson.id;
    obj.url = reviewImageJson.url

    res.json({ ...obj })
})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;

    const targetReview = await Review.findOne({
        where: {
            id: reviewId
        },
        
    })

    if (!targetReview) {
        const err = new Error("Review Couldn't be found");
        err.status = 404;

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        return next(err);
    }

    if (req.user.id !== targetReview.userId){
        const err = new Error("Review must belong to the current user");
        err.status = 403

        res.status(403).json({
            "message": err.message,
            "statusCode": err.status
        })

        return next(err);
    }

     targetReview.set({
        review,
        stars
    })

   await targetReview.save()
    const reviewJson = targetReview.toJSON();
    console.log('targetReview')
    return res.json({targetReview})
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findOne({
        where: {
            id: reviewId
        }
    })
    console.log(review)
    if( !review ) {
        const err = new Error("Review couldn't be found");
        err.status = 404;

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

        return next(err);
    }

    if(req.user.id !== review.userId){
        const err = new Error("Review must belong to the current user");
        err.status = 403;

        res.status(403).json({
            "message": err.message,
            "statusCode": err.status
        })

        return next(err);
    }

    await review.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
