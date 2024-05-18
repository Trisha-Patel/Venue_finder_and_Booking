var express = require('express');
const AdminModel = require('../model/admin');
var router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('/home');
});
router.get('/add-admin', function(req, res, next) {
  res.render('admin/add-admin');
});
router.post('/adminprocess',function(req, res, next){
  var filename = req.files.file12.name;

  var admindata={
    adminname:req.body.name,
    adminemail:req.body.email,
    adminpassword: req.body.password,
    adminmobile:req.body.mobile,
    adminaddress: req.body.address,
    adminphoto:filename,
  }
  var myfile = req.files.file12;

  AdminModel.create(admindata)
  .then(()=> console.log('Record Added'))
  .catch((err)=> console.log(err));
  myfile.mv('public/upload/'+ filename, function(err){
    res.redirect('/admin/display-admin');
  })
});

router.get('/display-admin', function(req, res, next) {
  AdminModel.find()
  .then(data =>{
    console.log(data);
    res.render('admin/display-admin',{admindata : data});
  })
  .catch(err => console.log(err))
});
router.get('/delete/:id',function(req, res , next){
  var id = req.params.id;

  AdminModel.findByIdAndDelete(id)
    .then(data =>{
      
      res.redirect('/admin/display-admin');

    })
    .catch(err => console.log(err))
  
});



module.exports = router;
