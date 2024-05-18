const mongoose= require('mongoose');

 var mySchema = new mongoose.Schema({
    log_name: String,
    log_gender: String,
    log_dob: String,
    log_mobile: String,
    log_email: String,
    log_password: String,
   
    log_joindate : {type: Date, default: Date.now},
 })

 const LogModel = mongoose.model('log',mySchema);
 module.exports = LogModel;


