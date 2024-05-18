var express = require('express');
const UserModel = require('../model/user');
var router = express.Router();

/* GET home page. */
router.get('/user', function(req, res, next) {
  res.render('/home');
});
router.get('/add-user', function(req, res, next) {
  res.render('user/add-user');
});
router.post('/userprocess',function(req, res, next){
  var filename = req.files.file12.name;

  var userdata={
    username:req.body.name,
    useremail:req.body.email,
    userpassword: req.body.password,
    usermobile:req.body.mobile,
    useraddress: req.body.address,
    userphoto:filename,
  }
  var myfile = req.files.file12;

  UserModel.create(userdata)
  .then(()=> console.log('Record Added'))
  .catch((err)=> console.log(err));
  myfile.mv('public/upload/'+ filename, function(err){
    res.redirect('/user/display-user');

  })
});

router.get('/display-user', function(req, res, next) {
  UserModel.find()
  .then(data =>{
    console.log(data);
    res.render('user/display-user',{userdata: data});
  })
  .catch(err => console.log(err))
});
router.get('/delete/:id',function(req, res , next){
  var id = req.params.id;

  UserModel.findByIdAndDelete(id)
    .then(data =>{
      
      res.redirect('/user/display-user');

    })
    .catch(err => console.log(err))
  
});

module.exports = router;
