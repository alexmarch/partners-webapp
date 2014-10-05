function CampaignController ($scope,user, campaignService, campaign, campaigns, $state){
  $scope.user = user;
  $scope.newCampaign = {
    name: '',
    description: ''
  };
  $scope.name = "dasdsad";
  $scope.campaigns = campaigns;
  this.campaignService = campaignService;

  $scope.errors = {};
  $scope.submit = angular.bind(this, this.submit);
  $scope.delete = angular.bind(this, this.delete);
  $scope.update = angular.bind(this, this.update);

  if(campaign!=null){
    angular.extend($scope.newCampaign, campaign);
  };

  this.scope = $scope;
  this.state = $state;
}
CampaignController.prototype = {
  submit: function(){
    var campaign = this.campaignService.create(this.scope.newCampaign),
        this_ = this;
    campaign.then(function(campaign){
      this_.state.go('campaign');
    }).catch(function(err){
      this_.error(err);
    });
  },
  delete: function(id){
    var deleteCD = this.campaignService.delete(id);
    var this_ = this;
    deleteCD.then(function(delRecords){
      var campaigns = this_.campaignService.list();
      campaigns.then(function(campaigns){
        this_.scope.campaigns = campaigns;
      });
    }).catch(function(err){
      console.log(err);
    });
  },
  error: function(err){
    var this_ = this;
    if(err.hasOwnProperty('invalidAttributes')){
      this_.scope.errors = err.invalidAttributes;
    }else if(err.hasOwnProperty('message')){
      this_.scope.messages = err.message;
    }
  },
  update: function(){
    var this_ = this;
    this.campaignService
        .update(this.scope.newCampaign)
        .then(function(result){
          this_.state.go('campaign');
        }).catch(function(err){
          this_.error(err);
        });
  }
}
angular.module('partnerWebApp')
    .controller('CampaignController', CampaignController);