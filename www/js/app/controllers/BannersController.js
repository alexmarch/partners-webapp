function BannersController($scope, programs, sites, campaigns, user, authService){
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
  /**
   * Banners types
   * @type {{flash: number, static: number}}
   */
  $scope.bannerType = {
    flash: 1,
    static: 2
  };
  $scope.currentBannerType = $scope.bannerType.static;
  /**
   * Banner format
   * @type {{horizontal: number, vertical: number}}
   */
  $scope.bannerFormat = {
    horizontal: 1,
    vertical: 2
  };
  $scope.currentBannerFormat = $scope.bannerFormat.horizontal;

  $scope.banners = {
    static: {
      horizontal: [
        {image:'banner1.jpg', width:'320', height: '480'},
        {image:'banner2.jpg', width:'320', height: '480'},
        {image:'banner3.jpg', width:'320', height: '480'}
      ]
    }
  }
};

BannersController.resolve = {
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

BannersController.state = {
  name: "banners_list",
  url: "/banners/list",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + 'views/banners/list.html',
      controller: 'BannersController as banerc',
      resolve: BannersController.resolve
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

function config($stateProvider){
  $stateProvider.state(BannersController.state);
}

angular.module('partnerWebApp')
    .controller('BannersController', BannersController)
    .config(config);
