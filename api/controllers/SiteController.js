/**
 * SiteController
 *
 * @description :: Server-side logic for managing Sites
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  list: function(req, res, err){
    Site.find().exec(function(err, sites){
      if(err){
        return next(err);
      }
      res.json(sites);
    });
  }
};

