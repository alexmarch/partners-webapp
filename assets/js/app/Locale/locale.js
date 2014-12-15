'use strict';

angular.module('app.locale', ['pascalprecht.translate']);

angular.module('app.locale').directive('appLocale', ['$translate', function($translate) {
  return {
    strict: 'AE',
    template: '<div class="pull-right"><a href="" ng-click="toggleLanguage()">EN</a><a ng-click="toggleLanguage()"></a></div>',
    link: function($scope, element, attr) {
      $scope.toggleLanguage = function() {
        $translate.use($translate.use() === 'en' ? 'ru' : 'en');
      }
    }
  }
}]);
