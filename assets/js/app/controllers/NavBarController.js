function NavBarController($scope, authService, $location, $log, $state, $stateParams){

  authService.getUser().then(function(currentUser){
    $scope.user = currentUser;
    console.log($scope.user);
  });
  
  // var user = authService.getUser();

  // user.then(function(user){
  //   if(angular.isDefined(user.id)){
  //     $scope.user = user;
  //   }
  // });

  this.scope = $scope;

  this.authService = authService;
  this.location = $location;
  this.log = $log;
  this.$state = $state;
  this.scope.logout = angular.bind(this, this.logout);

    var $menubar = angular.element('*[data-navmenu]');
    $menubar.on('click',':first', function(e){
      $menubar.toggleClass('animate');
      $(this).find('.fa').toggleClass('fa-bars').toggleClass('fa-times');
      $menubar.find('ul').toggleClass('hide-menu');
      e.preventDefault();
    });
    var offsetTop = angular.element('.main-content').offset().top
    angular.element(window).scroll(function(){
      if(window.scrollY >= offsetTop-30) {
        $menubar.removeClass('hide-menu')
      }else if(!$menubar.hasClass('hide-menu')){
        $menubar.addClass('hide-menu')
      }
    });
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
