/**
 * CampaignController
 *
 * @description :: Server-side logic for managing Campaigns
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res, next) {
    var campaign = {
      name: req.param('name'),
      description: req.param('description'),
      owner: req.session.user.id
    };
    User.findOne(req.session.user.id).populate('campaigns').exec(function (err, user) {
      if(!err, user.campaigns.length < 10){
        Campaign.create(campaign).exec(function (err, campaign) {
          if (err) {
            return next(err);
          };
          return res.json(campaign);
        });
      }else{
        return res.json({message: 'Max total campaigns (10)'},400);
      }
    });
  },
  list: function (req, res, next) {
    User.findOne(req.session.user.id).populate('campaigns').exec(function (err, campaigns) {
      if (err) {
        return next(err);
      };
      return res.json(campaigns);
    })
  },
  update: function (req, res, next) {
    console.log(req.param('id'), req.param('name'));
    Campaign
        .update({owner: req.session.user.id, id: req.param('id')},
        {name: req.param('name'), description: req.param('description')})
        .exec(function (err, campaign) {
          if (err) {
            console.log("Error:",err);
            return next(err);
          };
          console.log("Campaign:",campaign);
          return res.json(campaign);
        });
  },
  edit: function(req, res, next){
    Campaign.find({id: req.param('campaignId'), owner: req.session.user.id}).exec(function(err, campaign){
      if (err) {
        return next(err);
      };
      return res.json(campaign[0]);
    });
  },
  delete: function (req, res, next) {
    Campaign.destroy({id: req.param('campaignId')}).exec(function deleteCb(err, delRecords) {
      if (err) {
        return next(err);
      };
      return res.json(delRecords);
    });
  }
};

