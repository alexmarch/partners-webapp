/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');

module.exports = {

  create: function (req, res, next) {
    var user = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      passwordConfirmation: req.param('passwordConfirmation')
    };
    User.create(user).exec(function (err, user) {
      if (err) {
        return next(err)
      };
      req.session.user = user.toJSON();
      return res.json(user.toJSON());
    })
  },

  new: function (req, res, next) {
    User.find({name: req.param('name')}).exec(function (err, user) {
      if (err) {
        return next(err);
      };
      if (user.length > 0) {
        bcrypt.compare(req.param('password'), user[0].password, function (err, result) {
          if (err) {
            return next(err)
          };
          console.log(user[0].password, result);
          if(result){
             req.session.user = user[0].toJSON();
            return res.json(user[0].toJSON(),200);
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

  destroy: function (req, res) {
    console.log("session:",req.session.user);
    if (req.session.user) {
      delete req.session.user;
      return res.json({status: "success"}, 200);
    } else {
      return res.json({message: "Login error"}, 400);
    }
  }
};

