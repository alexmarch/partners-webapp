/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    util = require('util'),
    Promise = require('bluebird');

function checkUser(name){
 return new Promise(function(resolve, reject) {
   User.findByName(name)
       .exec(function (err, user) {
         if(err || user.length === 0){
           resolve(err)
         }else{
           reject(user[0])
         }
       });
 });
};
function checkEmail(email){
  return new Promise(function(resolve, reject) {
    User.findByEmail(email)
        .exec(function (err, user) {
          if(err || user.length === 0){
            resolve(err)
          }else{
            reject(user[0]);
          }
        });
  });
};
module.exports = {

  create: function (req, res, next) {
    var user = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      passwordConfirmation: req.param('passwordConfirmation')
    };

    var token;

    var code = parseInt(crypto.randomBytes(8).toString('hex'), 16).toString().slice(0, 4);

    checkUser(req.param('name')).then(function(err){

      checkEmail(req.param('email')).then(function(err){

        User.create(user).exec(function (err, user) {

          if (err) return next(err);
          /**
           * Send confirmation email
           */
          token = crypto.randomBytes(32).toString('base64').replace('\/','','ig');

          user.emailConfirmationToken = token;
          user.confirmationTokenExpireDate = new Date((new Date).setDate((new Date()).getDate() - 2));

          EmailService.confirmEmail({
            username: user.name,
            domain: process.env.DOMAIN || 'localhost',
            token: token,
            back_email: process.env.BACK_EMAIL || '',
            support_link: process.env.SUPPORT_LINK || 'support@'+process.env.DOMAIN
          },{
            to: user.email,
            from: 'Affiliate service <noreply@email.com>',
            subject: 'Email confirmation'
          });

          Tracking.create({code: code, user: user.id}).exec(function(err, tracking){

            if(err) return next(err);

            user.tracking = tracking.id;

            user.save(function(err){

              if(err) return next(err)

              res.json({
                message: "You have been successfully registered please confirm your email: " + user.email
              });
              //User.findOne(user.id).populate('tracking').exec(function(err, user){
              //  if(err) return next(err);
              //  req.session.user = user.toJSON();
              //  return res.json(user.toJSON());
              //});
            });
          });
        });
      }).catch(function( result ){
        res.json({invalidAttributes: { email: [
          { message: result.hasOwnProperty('email')  ? 'Email "' + result.email + '" exist!' : 'Invalid email format !' }]
        }}, 400);
      });
    }).catch(function( result ){
      res.json({invalidAttributes: { name: [
        { message: result.hasOwnProperty('name') ? 'Login "' + result.name +'" exist!' : 'Invalid login format !' }]
      }}, 400);
    });
  },

  new: function (req, res, next) {
    User.find({name: req.param('name')}).populate('tracking').exec(function (err, user) {
      if (err) {
        return next(err);
      };
      if (user.length > 0) {

        //Check if user not confirmed yet

        if(user[0].emailConfirmationToken){
          return res.json({message: "Email address not confirmed !" }, 400);
        };

        bcrypt.compare(req.param('password'), user[0].password, function (err, result) {
          if (err) {
            return next(err)
          };
          if(result){
             req.session.user = user[0].toJSON();
            return res.json({user: user[0].toJSON() });
          }else{
            return res.json({invalidAttributes: {
              password: [
                {message: "Password not valid" }
              ]
            }}, 400);
          }
        })
      } else {
        return res.json({invalidAttributes: {
          name: [
            {message: "This user name not registered"}
          ]
        }}, 400);
      }
    });
  },

  get: function(req, res, next){
    if (req.session.user) {
      User.findOne(req.session.user.id).populate('tracking').exec(function (err, user){
        if(!err){
           return res.json(user.toJSON(), 200);
        }
        next(err);
      });
    }else{
      res.json(null, 200);
    }
  },

  confirmEmail: function(req,res){
    User.find({emailConfirmationToken: req.param('token')}).exec(function(err, user){
      if(err || user.length === 0){
        return res.redirect('/#signup');
      };
      user[0].emailConfirmationToken = undefined;
      user[0].save(function(err){
        if(err) return sails.log.error(err);
        res.redirect('/#signin');
      });
    });
  },

  destroy: function (req, res) {
    if (req.session.user) {
      delete req.session.user;
      return res.json({status: "success"}, 200);
    } else {
      return res.json({message: "Login error"}, 400);
    }
  }
};

