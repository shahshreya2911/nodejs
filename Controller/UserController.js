// userController.js
// Import user model

User = require('../Model/UserModel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developerphpsmtp@gmail.com',
    pass: 'unuyswjyqdvtndnk'
  }
});
const saltRounds = 10;
// Handle index actions
exports.authenticate = function (req, res) {
  User.findOne({ email: req.body.email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result === true) {
                        var token1 = jwt.sign({ username: req.body.email , password : req.body.password }, 'secret');

           res.json({
            status: "success",
            message: "Login successfully",
            data: user,
            token : token1
            });
        } else {
           res.json({
            status: "Fail",
            message: "Inavalid Data",
            data: ""
            });
        }
      })
    });
}
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
     bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
    var mailOptions = {
      from: 'developerphpsmtp@gmail.com',
      to: req.body.email,
      subject: 'Thank You For Register!',
      text: 'You Are Registered With Us!'
    };
   
    var user = new User();
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = hash;
// save the user and check for errors
    user.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New User created!',
            data: user
        });
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    });
     });
};
// Handle view User info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};
// Handle update User info
exports.update = function (req, res) {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;
// save the User and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'user Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'user deleted'
        });
    });
};