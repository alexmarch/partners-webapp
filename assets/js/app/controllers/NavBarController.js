function NavBarController($scope, AuthService, $location, $log, $state, $stateParams){
  $scope.user = AuthService.getUser();
  this.scope = $scope;

  this.authService = AuthService;
  this.location = $location;
  this.log = $log;
  this.scope.logout = angular.bind(this, this.logout);
};

NavBarController.prototype = {
  logout: function(){
    var this_ = this;
    this.authService.close()
        .then(function(){
          this_.location.path('/');
        }).catch(function(err){
          this_.log.error(err);
        });
  }
};

angular.module('partnerWebApp')
    .controller('NavBarController', NavBarController);
