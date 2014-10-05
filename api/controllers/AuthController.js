/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = {

  create: function (req, res, next) {
    var user = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      passwordConfirmation: req.param('passwordConfirmation')
    };
    var code = parseInt(crypto.randomBytes(8).toString('hex'), 16).toString().slice(0, 4);

    User.create(user).exec(function (err, user) {
      if (err) {
        return next({ "invalidAttributes": err });
      };

      Tracking.create({code: code, user: user.id}).exec(function(err, tracking){
        if(err) {
          return next(err)
        };

        user.tracking = tracking.id;

        user.save(function(err){

          if(err) return next(err)

          User.findOne(user.id).populate('tracking').exec(function(err, user){
            if(err) return next(err);
            console.log(user);
            req.session.user = user.toJSON();
            return res.json(user.toJSON());
          });

        });
      });
    })
  },

  new: function (req, res, next) {
    User.find({name: req.param('name')}).populate('tracking').exec(function (err, user) {
      if (err) {
        return next(err);
      };
      if (user.length > 0) {
        bcrypt.compare(req.param('password'), user[0].password, function (err, result) {
          if (err) {
            return next(err)
          };
          if(result){
             req.session.user = user[0].toJSON();
            return res.json(user[0].toJSON());
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
  get: function(req, res){
    console.log(req.session.user);
    return res.json(req.session.user,200);
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

