/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  PartnerProgram.create(
      [{programID:100, name:'Studio commission'},
      {programID:101, name:'Performer commission'},
      {programID:102, name:'Member commission'}]
  ).exec(function(err, programs){
        if(!err){
          console.log("Partner programs OK.");
        }
      });
  Site.create([{domainName: 'feelmeonline.com'},{domainName: 'hotmodelson.com'}])
      .exec(function(err, site){
        if(!err){
          console.log("Sites OK.");
        }
      });
  cb();
};
