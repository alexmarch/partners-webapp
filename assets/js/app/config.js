angular.module('partnerWebApp')
  .config(['$translateProvider', function($translateProvider){
    $translateProvider.useStaticFilesLoader({
      'prefix': 'l10n/',
      'suffix': '.json'
    });
    $translateProvider.preferredLanguage('en');
  }]);