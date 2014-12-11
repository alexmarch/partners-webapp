angular.module('partnerWebApp')
  .config(['$translateProvider', function($translateProvider){
    $translateProvider.useStaticFilesLoader({
      'prefix': 'js/app/l10n/',
      'suffix': '.json'
    });
    $translateProvider.preferredLanguage('en');
  }]);