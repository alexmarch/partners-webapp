/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');
module.exports = {
  tableName: 'users',
  types: {
    confirmPassword: function (password) {
      return password === this.passwordConfirmation
    }
  },
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      confirmPassword: true,
      required: true,
      minLength: 5
    },
    passwordConfirmation: {
      type: 'string'
    },
    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      delete user.passwordConfirmation;
      return user;
    }
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return cb(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return cb(err);
        }
        user.password = hash;
        user.passwordConfirmation = null;
        return cb();
      });
    });

  }
};

