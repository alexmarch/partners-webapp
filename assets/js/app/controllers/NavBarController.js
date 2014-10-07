function NavBarController($scope, authService, $location, $log, $state, $stateParams){

  $scope.user = {};

  var user = authService.getUser();

  user.then(function(user){
    $scope.user = user;
  });

  this.scope = $scope;

  this.authService = authService;
  this.location = $location;
  this.log = $log;
  this.$state = $state;
  this.scope.logout = angular.bind(this, this.logout);
};

NavBarController.prototype = {
  logout: function(){
    var this_ = this;
    this.authService.close()
        .then(function(){
          this_.$state.go('signin');
        }).catch(function(err){
          this_.log.error(err);
        });
  }
};

angular.module('partnerWebApp')
    .controller('NavBarController', NavBarController);
