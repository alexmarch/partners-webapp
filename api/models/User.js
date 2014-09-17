/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
    name:{
        type: 'string',
        required: true,
        unique: true
    },
    email:{
        type: 'email',
        required: true,
        unique: true
    },
    password:{
        type: 'string'
    }
  },
  beforeCreate: function(user, cb){
    bcrypt.hash(
      user.password, 10, function(err, hash){
        if(err){
          return  cb(err);
        }
        user.password = hash;
        return cb(user);
      }
    )
  }
};

