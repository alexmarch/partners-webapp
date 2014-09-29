function DashboardController ($scope, $state, $stateParams, authService, user){
  $scope.user = user;
};

angular.module('partnerWebApp')
    .controller('DashboardController', DashboardController);