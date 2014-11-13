function StatisticController($scope, programs, campaigns, user, authService, DTOptionsBuilder, DTColumnBuilder, $resource, statistic){

  $scope.programs = programs;
  $scope.campaigns = campaigns;
  $scope.authService = authService;
  $scope.currentBannerType = 1;
  //Set default values
  $scope.domainName = sites[0].domainName;
  $scope.campaignID = campaigns.campaigns[0].id;
  $scope.currentProgramId = programs[1].programID;
  $scope.partnerID = user.id;

  // $scope.statistic = $resource('/affiliate/statistic').query();
  $scope.persones = statistic;
  
  this.$scope = $scope;
  
  this.chageCampaign = angular.bind(this, this.chageCampaign);
  this.changeProgram = angular.bind(this, this.chageCampaign);

  // $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

  // $scope.dtColumns = [
  //   // DTColumnBuilder.newColumn('id').withTitle('ID'),
  //   DTColumnBuilder.newColumn('login').withTitle('User name'),
  //   DTColumnBuilder.newColumn('partner_id').withTitle('Traking code'),//.notVisible()
  //   DTColumnBuilder.newColumn('program_id').withTitle('Program ID'),
  //   DTColumnBuilder.newColumn('campaign_id').withTitle('Campaign ID')
  // ];

};

StatisticController.prototype = {
  chageCampaign: function () {
    console.log("Change campaign");
  },
  changeProgram: function () {
    console.log("Change program");
  }
};

StatisticController.resolve = {
  isAuthorized: function(authService) {
    return authService.isAuthorized()
  },
  user: function (authService) {
    return authService.getUser();
  },
  programs: function(linksService){
    return linksService.getPrograms();
  },
  campaigns: function(campaignService, $state){
    var campaignsList = campaignService.list();
    campaignsList.then(function(campaigns){
      if(campaigns.campaigns.length === 0){
        $state.go('campaign');
      }
    });
    return campaignsList;
  },
  statistic: function ($resource) {
    return $resource('/affiliate/statistic').query();
  }
};

StatisticController.state = {
  name: "statistic",
  url: "/statistic",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + 'views/statistic/statistic.html',
      controller: 'StatisticController as statistic',
      resolve: StatisticController.resolve
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

function config($stateProvider){
  $stateProvider.state(StatisticController.state);
}

angular.module('partnerWebApp')
    .controller('StatisticController', StatisticController)
    .config(config);
