const express = require('express');
const {requireAuth} = require('../../utils/auth')
const {SpotImage, Spot} = require('../../db/models')

const router = express.Router();



router.delete('/:spotImageId', requireAuth, async (req, res, next) => {
    const { spotImageId } = req.params;

    const spotImage = await SpotImage.findOne({
        where: {
            id: spotImageId
        }
    })

    if (!spotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;

        res.status(404).json({
            "message": err.message,
            "statusCode": err.status
        })

       return next(err);
    }
    const spot = await Spot.findOne({
        where: {
            id: spotImage.spotId
        }
    })

    

console.log(req.user.id, spot.ownerId)
    if (req.user.id !== spot.ownerId){
        const err = new Error("Spot must belong to the current user");
        err.status = 403;

        res.status(403).json({
            "message": err.message,
            "statusCode": err.status
        })

         return next(err);
    }

    await spotImage.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
