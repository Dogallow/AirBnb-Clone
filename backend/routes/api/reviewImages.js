const express = require('express');

const { ReviewImage, Review } = require('../../db/models');

const router = express.Router();
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    const reviewImage = await ReviewImage.findOne({
        where: {
            id: imageId
        }
    })

    if (!reviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;

        res.json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err);
    }
    const review = await Review.findOne({
        where: {
            id: reviewImage.reviewId
        }
    })

    console.log(review)
    if (req.user.id !== review.userId){
        const err = new Error("Review must belong to the current User");
        err.status = 403;

        res.status(403).json({
            "message": err.message,
            "statusCode": err.status
        })

        next(err)
    }

    await reviewImage.destroy()

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
