var basePath = 'js/app/';

function DashboardController ($scope, $state, $stateParams, campaigns, user, authService){
  $scope.user = user;
  $scope.campaigns = campaigns.campaigns;
};


DashboardController.resolve = {
  user: function (authService) {
    return authService.getUser();
  },
  isAuthorized: function(authService) {
    return authService.isAuthorized()
  },
  campaigns: function(campaignService, $state){
    return campaignService.list();
  }
}


DashboardController.state = {
  name: "dashboard",
  url: '/dashboard',
  views: {
    "navBarView": {templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc' },
    "contentView": {
      templateUrl: basePath + 'views/dashboard/dashboard.html',
      controller: 'DashboardController as dashboard',
      resolve: DashboardController.resolve
      },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
    }
};

function config($stateProvider){
  $stateProvider.state(DashboardController.state);
}

angular.module('partnerWebApp')
    .controller('DashboardController', DashboardController)
    .config(config);
