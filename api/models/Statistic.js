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
  	// @todo - ge statistic by filter
  	Statistic.query('SELECT authorize.login, authorize.partner_id, authorize.program_id, authorize.campaign_id ' +
  		'FROM authorize WHERE partner_id = ?', [opts.tracking.code], function (err, result) {
  			if(err){
  				return cb(err,null);
  			}
  			cb(null, result);
  		});
  }
};

