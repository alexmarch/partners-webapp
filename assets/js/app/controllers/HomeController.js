function HomeController(user,$state){
  if (angular.isDefined(user.id)) {
    $state.go('dashboard');
  } else {
    $state.go('signup');
  };
};
angular.module('partnerWebApp')
    .controller('HomeController', HomeController);