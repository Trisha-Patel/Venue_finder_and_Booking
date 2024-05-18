var express = require('express');
const VenueModel = require('../model/venue');

var router = express.Router();

/* GET VENUE home page. */
router.get('/venueprofile', function(req, res, next) {
  VenueModel.find()
  .then (data =>{
    console.log(data);
    res.render('userside/venueprofile',{ ve: data})
  })
  .catch((err) => console.log(err));
});

module.exports = router;