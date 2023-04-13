const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');


router.post('/key', (req, res) => {
    res.json({ googleMapsAPIKey });
});

async function getGeoLocation(){
    const {Geocoder} = await google.maps.importLibrary("geocoding")
    Geocoder.geocode("GET", (result, status) => {
        
    })
}

module.exports = router;
