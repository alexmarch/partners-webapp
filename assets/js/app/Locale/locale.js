'use strict';

angular.module('app.locale', ['pascalprecht.translate']);

angular.module('app.locale').directive('appLocale', ['$translate', function($translate) {
  return {
    strict: 'AE',
    templateUrl: "Locale/locale.html" ,
    scope: {
      langs: "@"
    },
    link: function($scope, element, attr) {
      $scope.toggleLanguage = function(lang) {
        $translate.use(lang);
      }
    }
  }
}]);
