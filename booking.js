var express = require('express');
const BookingModel = require('../model/booking');
var router = express.Router();

/* GET home page. */

router.get('/booking', function(req, res, next) {
  res.render('/home');
});
router.get('/add-booking', function(req, res, next) {
  res.render('booking/add-booking');
});
router.post('/bookingprocess',function(req, res, next){
 

  var bookingdata={
    bookingname:req.body.name,
    bookingdate:req.body.date,
    bookingdetails:req.body.details,
    bookingnumber:req.body.Number,
   
  }
  

  BookingModel.create(bookingdata)
  .then(()=> console.log('Record Added'))
  .catch((err)=> console.log(err));
 
    res.redirect('/booking/display-booking');

 
});

router.get('/display-booking', function(req, res, next) {
  BookingModel.find()
  .then(data =>{
    console.log(data);
    res.render('booking/display-booking',{bookingdata : data});
  })
  .catch(err => console.log(err))
});
router.get('/delete/:id',function(req, res , next){
  var id = req.params.id;

  BookingModel.findByIdAndDelete(id)
    .then(data =>{
      
      res.redirect('/booking/display-booking');

    })
    .catch(err => console.log(err))
  
});




module.exports = router;
