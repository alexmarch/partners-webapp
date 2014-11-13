/**
* Statistic.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'site-db',
  attributes: {

  },
  getByFilter: function (opts, cb) {

    var q = 'SELECT authorize.id, authorize.login, authorize.partner_id, authorize.program_id, ' + 
    'authorize.campaign_id, sum(sessions.billedchips), sessions.date ' +
    'FROM authorize ' +
    'LEFT JOIN sessions ' +
    'ON authorize.id = sessions.userid ' +
    'WHERE partner_id=? GROUP BY sessions.userid';

  	Statistic.query(q, [opts.tracking.code], function (err, result) {
  			if(err){
  				return cb(err,null);
  			}
  			cb(null, result);
  		});
  }
};

