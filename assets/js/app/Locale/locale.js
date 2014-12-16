'use strict';

angular.module('app.locale', ['pascalprecht.translate']);

angular.module('app.locale').directive('appLocale', ['$translate', function ($translate) {
  return {
    strict: 'AE',
    templateUrl: "js/app/Locale/locale.html",
    scope: {
      locales: "=",
      options: "="
    },
    link: function ($scope, element, attr) {
      $scope.currentLang = $translate.use();
      var options = $scope.options;
      if (angular.isObject(options)) {
        if (options.hasOwnProperty('showIcons') &&
          options.hasOwnProperty('showIcons') == true &&
          options.hasOwnProperty('iconsBasePath')) {

          $scope.showIcons = options.hasOwnProperty('showIcons');
          $scope.iconsBasePath = options.iconsBasePath;
          console.log($scope.options);
        }
        if (options.hasOwnProperty('icons')) {
          $scope.icons = options.icons;
        }
      }

      $scope.toggleLanguage = function (lang) {
        $translate.use(lang);
        $scope.currentLang = lang;
      }
    }
  }
}
])
;
