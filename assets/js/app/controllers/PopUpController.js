function PopUpController($scope, programs, sites, campaigns, user, authService){
  $scope.sites = sites;
  $scope.programs = programs;
  $scope.campaigns = campaigns;
  $scope.authService = authService;
  $scope.currentBannerType = 1;
  //Set default values
  $scope.domainName = sites[0].domainName;
  $scope.campaignID = campaigns.campaigns[0].id;
  $scope.currentProgramId = programs[1].programID;
  $scope.partnerID = user.id;
  $scope.page = 'index.php';
};

PopUpController.resolve = {
  isAuthorized: function(authService) {
    return authService.isAuthorized()
  },
  user: function (authService) {
    return authService.getUser();
  },
  programs: function(linksService){
    return linksService.getPrograms();
  },
  sites: function(linksService){
    return linksService.getSites();
  },
  campaigns: function(campaignService, $state){
    var campaignsList = campaignService.list();
    campaignsList.then(function(campaigns){
      if(campaigns.campaigns.length === 0){
        $state.go('campaign');
      }
    });
    return campaignsList;
  }
};

PopUpController.state = {
  name: "popup",
  url: "/popup/list",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + 'views/popup/list.html',
      controller: 'PopUpController as popupc',
      resolve: BannersController.resolve
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

function config($stateProvider){
  $stateProvider.state(PopUpController.state);
}

angular.module('partnerWebApp')
    .controller('PopUpController', PopUpController)
    .config(config);
