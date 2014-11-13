/**
 * StatisticController
 *
 * @description :: Server-side logic for managing Statistic
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  statistic: function(req, res, next){
  	Statistic.getByFilter(req.session.user, function(err, result){
  		if(err) return next(err);
  		return res.json(result, 200);
  	});
  }
};
