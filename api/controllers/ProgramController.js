/**
 * ProgramController
 *
 * @description :: Server-side logic for managing Programs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list: function(req, res, err){
    PartnerProgram.find().exec(function(err, programs){
      if(err){
        return next(err);
      }
      res.json(programs);
    });
  }
};

