// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const bookingsRouter = require('./bookings.js')
const reviewsRouter = require('./reviews.js');
const spotImageRouter = require('./spotImages.js')
const reviewImageRouter = require('./reviewImages.js')
const mapsRouter = require('./maps')

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const review = require('../../db/models/review.js');

// If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to nu
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImageRouter);
router.use('/review-images', reviewImageRouter);
router.use('/maps', mapsRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

// router.get(
//     '/restore-user',
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// // GET /api/require-auth
router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'candyCrush'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

module.exports = router;
