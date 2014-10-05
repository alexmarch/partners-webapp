function ngInputValidator() {
  return {
    restrict: 'A',
    scope: {
      'ngInputValidator': '=',
      'errorMessage': '=',
      'errorPlacement': '@'
    },
    link: function (scope, element, attrs) {
      scope.$watch('errorMessage', function (current, old) {
        if (current) {
          element.tooltip({
            title: current[0].message,
            placement: scope.errorPlacement,
            trigger: 'manual',
            delay: {
              "hide": 0
            },
            template:'<div class="tooltip error" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
          }).tooltip('show');
        } else {
          element.tooltip('destroy');
        }
      });

    }
  }
}
angular.module('partnerWebApp')
    .directive('ngInputValidator', ngInputValidator);
