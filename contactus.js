var express = require('express');
const ContactusModel = require('../model/contactus');
var router = express.Router();

/* GET home page. */

router.get('/contact', function(req, res, next) {

    const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "nodejs1206@gmail.com",
    pass: "fwlp ruoh gfml mrlq",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'nodejs1206@gmail.com', // sender address
    to: "nodejs1206@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

});
router.post('/contactprocess',function(req, res, next){
 

  var contactusdata={
    contactname:req.body.name,
    contactphone:req.body.phone,
    contactemail:req.body.email,
    contactsubject:req.body.subject,
    contactmessage:req.body.message,
  }
  

  ContactusModel.create(contactusdata)
  .then(()=> console.log('Submitted'))
  .catch((err)=> console.log(err));
 
    res.redirect('/userside/dashboard');

 
});

router.get('/contact', function(req, res, next) {
  ContactusModel.find()
  .then(data =>{
    console.log(data);
    res.render('userside/contact',{contactusdata : data});
  })
  .catch(err => console.log(err))
});




module.exports = router;
