var express = require('express');
const CategoryModel = require('../model/category');
var router = express.Router();

/* GET home page. */
router.get('/category', function(req, res, next) {
  res.render('/home');
});
router.get('/add-category', function(req, res, next) {
  res.render('category/add-category');
});
router.post('/categoryprocess',function(req, res, next){
  var filename = req.files.file12.name;

  var categorydata={
    categoryname:req.body.name,
    categorydetails:req.body.details,
    categoryaddress: req.body.address,
    categoryprice: req.body.price,
    categoryphoto:filename,
  }
  var myfile = req.files.file12;

  CategoryModel.create(categorydata)
  .then(()=> console.log('Record Added'))
  .catch((err)=> console.log(err));
  myfile.mv('public/upload/'+ filename, function(err){
    res.redirect('/category/display-category');

  })
});

router.get('/display-category', function(req, res, next) {
  CategoryModel.find()
  .then(data =>{
    console.log(data);
    res.render('category/display-category',{categorydata : data});
  })
  .catch(err => console.log(err))
});
router.get('/delete/:id',function(req, res , next){
  var id = req.params.id;

  CategoryModel.findByIdAndDelete(id)
    .then(data =>{
      
      res.redirect('/category/display-category');

    })
    .catch(err => console.log(err))
  
});



module.exports = router;
