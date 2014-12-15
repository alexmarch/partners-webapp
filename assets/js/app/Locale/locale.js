'use strict';

angular.module('app.locale', ['pascalprecht.translate']);

angular.module('app.locale').directive('appLocale', ['$translate', function($translate) {
  return {
    strict: 'AE',
    template: '<div class="app-locale"><a href ng-click="toggleLanguage()">EN</a><a href ng-click="toggleLanguage()">RU</a></div>',
    link: function($scope, element, attr) {
      $scope.toggleLanguage = function() {
        $translate.use(($translate.use() === 'en') ? 'ru' : 'en');
        console.log($translate.use());
      }
    }
  }
}]);
