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




module.exports = router;
