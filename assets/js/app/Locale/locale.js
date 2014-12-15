'use strict';

angular.module('app.locale', ['pascalprecht.translate']);

angular.module('app.locale').directive('appLocale', ['$translate', function($translate) {
  return {
    strict: 'AE',
    templateUrl: "js/app/Locale/locale.html",
    scope: {
      applocales: "&locales"
    },
    link: function($scope, element, attr) {
      console.log($scope.applocales);
      $scope.toggleLanguage = function(lang) {
        $translate.use(lang);
      }
    }
  }
}]);
