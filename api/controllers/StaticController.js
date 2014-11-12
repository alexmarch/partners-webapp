/**
 * StaticController
 *
 * @description :: Server-side logic for managing Statics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res){
    res.view('static/index');
  },
  statistic: function(req, res, next){
  	Statistic.getByFilter(req.session.user,function(err, result){
  		if(err) return next(err);
  		console.log(result);
  		res.json(result, 200);
  	});
  }
};

