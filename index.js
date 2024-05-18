var express = require('express');
const UsersideModel = require('../model/userside');
var LogModel = require('../model/log_table');
var VenueModel = require('../model/venue');
var router = express.Router();

/* -------------------------------------------------------GET ADMIN home page.---------------------------------- */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

  router.get('/home', function( req, res , next){
    if(!req.session.email){
      console.log('email session is set');
      res.end(
        "Login required to access this page, please go to login page and access this page"
      );
      
   
    }
    res.render("home",{ log_email:req.session.email});
  });
  
  router.get('/admin', function(req, res, next) {
    res.render('lockscreen');
  });
router.get('/header', function(req, res, next) {
  res.render('header');
});
router.get('/sidebar', function(req, res, next) {
  res.render('sidebar');
});
router.get('/footer', function(req, res, next) {
  res.render('footer');
});
router.get('/Login', function(req, res, next) {
  res.render('Login');
});
router.get('/adisplay-table', function(req, res, next) {
  res.render('adisplay-table');
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});


// ------------------------------------------------------------HOME PAGE----------------------------------------->




//-------------------------------------------------------------------- REGISTER data (ADMINSIDE)----------------------------->

router.get('/register', function(req, res, next) {
  res.render('register');
});


router.post('/register',function(req,res,next){
  console.log(req.body);

// Array Creation
const mybodydata ={
  log_name: req.body.name,
  log_dob: req.body.dob,
  log_gender: req.body.gender,
  log_mobile: req.body.mobile,
  log_email: req.body.email,
  log_password: req.body.password,
}
var data = LogModel(mybodydata);

data.save();
res.redirect('/login');
});

router.get('/adisplay-table', function (req, res, next) {
  LogModel.find().then(function (db_logs_array) {
    console.log(db_logs_array);
    res.render('adisplay-table', { logs_array: db_logs_array });
  });
});

//-------------------------------------------------------------------- LOGIN data(ADMIN SIDE)----------------------------->


router.post("/login", function (req, res, next) {
  var log_email = req.body.email;
  console.log(log_email);  
  var log_password = req.body.password;
  console.log(log_password);

LogModel.findOne({log_email: log_email }).then(function (db_logs_array) {
    if (db_logs_array) {
      var db_email = db_logs_array.log_email;
      console.log(db_logs_array);
      console.log(db_email);
      var db_password = db_logs_array.log_password;
      console.log(db_password);
    }
    if (db_email == null) {
      res.end("Email not found");
    } else if (db_email == log_email && db_password == log_password) {
      console.log("success");
      req.session.email = db_email;   
      res.redirect("/home");
    } else {
      res.end(" Login failed");
    }
  });
});


//------------------------------------------------------Forgot password--------------------------------------------//


router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password');
});


router.post("/forgot-password", function (req, res, next) {
  var email = req.body.email;
  console.log(email);

  LogModel.findOne({ log_email: email }).then(function (db_logs_array) {
    console.log("Find one" + db_logs_array);

    if (db_logs_array) {
      var db_email = db_logs_array.log_email;
      console.log(db_email);
      var db_password = db_logs_array.log_password;
      console.log(db_password);
    }

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    } else if (db_email == email) {
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

      //<----------------------------------- async..await is not allowed in global scope, must use a wrapper------------>
      
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: " <trishapatel1521@gmail.com>", // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "hello your password is  " + db_password, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
      }

      main().catch(console.error);
    }
  });
  res.redirect("/login");
});


//<------------------------------------------------------------------------------change password------------------------->


router.get('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  res.render('change-password');
});

router.post('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;
  LogModel.findOne({ log_email: myemail }).then(function ( db_logs_array) {
   
      console.log(db_logs_array);
      if (opass == db_logs_array.log_password) {
        if (opass == npass) {
          res.send("New Password Must be Different then Old password");
        } else {
          if (npass == cpass) {
            LogModel.findOneAndUpdate({ log_email : myemail },
               { $set: { log_password: npass } })
               .then(function () {
                req.session.destroy();
                res.redirect("/login");
        
            });
           
          } else {
            res.send("New Password and Confirm Password not match");
          }
        }
      } else {
        res.send("Old Password Not Match");
      }
    }
  );
  
});


//<-------------------------------------------------------------------Logout Page------------------------------------->
router.get('/logout', function (req, res) {

  req.session.destroy();
  res.redirect("/admin");
});







//<*---------------------------------------------------------------USER SIDE CODE ------------------------------->>


router.get('/website', function(req, res, next) {
  res.render('userside/dashboard');
});
router.get('/utop', function(req, res, next) {
  res.render('userside/utop');
});
router.get('/usidebar', function(req, res, next) {
  res.render('userside/usidebar');
});
router.get('/ufooter', function(req, res, next) {
  res.render('userside/ufooter');
});
router.get('/about', function(req, res, next) {
  res.render('userside/aboutus');
});


router.get('/contact', function(req, res, next) {
  res.render('userside/contact');
});

router.get('/venue', function(req, res, next) {
  res.render('venue/venue', { title: 'Express' });
});


router.get('/venue', function(req, res, next) {
  res.render('venue/venueprofile');
});

router.get('/venue', function(req, res, next) {
  res.render('venue/venuetable');
});

//<--------------------------------------------------------------SIGN UP DATA-------------------------------------->

router.get('/signup', function(req, res, next) {
  res.render('userside/signup');
});


router.post("/signup", function (req, res, next) {
  const mysignupdata = {
    usersidename: req.body.name,
    usersidegender: req.body.gender,
    usersidedob: req.body.dob,
    usersideaddress: req.body.address,
    usersidemobile: req.body.mobile,
    usersideemail: req.body.email,
    usersidepassword: req.body.password,
  };
  console.log(mysignupdata);

  UsersideModel.create(mysignupdata)
    .then(() => console.log("record added successfully"))
    .catch((err) => console.log(err));
  res.redirect("/userlogin");
});

router.get("/udisplaytable", function (req, res, next) {
  UsersideModel.find().then(function (db_userside_array) {
    console.log(db_userside_array);
    res.render("udisplaytable", { userside_array: db_userside_array });
  });
});


//<-----------------------------------------------------------------Login PRocess Method-------------------------------->


router.get("/userlogin", function (req, res, next) {
  res.render("userside/userlogin");
});



router.post("/userlogin", function (req, res, next) {
  var userside_email = req.body.email;
  console.log(userside_email);
  var userside_password = req.body.password;
  console.log(userside_password);

  UsersideModel.findOne({ userside_email: userside_email }).then(function (db_usersides_array) {
    if (db_usersides_array) {
      var db_email = db_usersides_array.userside_email;
      console.log(db_usersides_array);
      console.log(db_email);
      var db_password = db_usersides_array.userside_password;
      console.log(db_password);
    }
    if (db_email == null) {
      res.end("Email not found");
    } else if (db_email == userside_email && db_password == userside_password) {
      console.log("sucess");
      req.session.email = db_email;
      res.redirect("/dashboard");
    } else {
      res.end(" Login failed");
    }
  });
});

// <------------------------------------------------------------home page code-------------------------------------->


router.get("/home", function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }

  res.render("home", { useremail: req.session.email });
});

//<-------------------------------------------------------------- VENUE PROFILE------------------------------------>

router.get('/venueprofile', function(req, res, next) {
  VenueModel.find()
  .then (data =>{
    console.log(data);
    res.render('userside/venueprofile',{ ve: data})
  })
  .catch((err) => console.log(err));
});



module.exports = router;
