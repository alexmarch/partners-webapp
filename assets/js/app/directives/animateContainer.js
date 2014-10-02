function animateContainer($timeout) {
  return {
    restrict: 'A',
    scope: {
      'animation': '@'
    },
    link: function (scope, element, attrs) {
      element.addClass('animate-container');
      $timeout(function(){
        element.addClass('start');
        element.addClass(scope.animation);
      },200);
    }
  }
}
angular.module('partnerWebApp')
    .directive('animateContainer', animateContainer);
