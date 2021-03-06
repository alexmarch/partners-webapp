/**
 * Initialize application
 */
'use strict';

var basePath = 'js/app/';

function isAuthorized (authService, $location, $q, $state) {
  var user = authService.getUser();
  var deferred = $q.defer();
  var currentUser = user.then(function (u) {
    if (angular.isUndefined(u.id)) {
      $state.go('home');
      deferred.reject();
    } else {
      deferred.resolve(currentUser);
    }
  });
  return deferred.promise;
};

var home = {
  name: "home",
  url: "/",
  views: {
    "navBarView": { templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc' },
    "contentView": {
      templateUrl: basePath + "views/home/index.html",
      controller: 'HomeController as home',
      resolve: {
        user: function (authService) {
          return authService.getUser();
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};


var signUp = {
  name: "signup",
  url: "/signup",
  views: {
    "navBarView": { templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc'  },
    "contentView": {
      templateUrl: basePath + "views/auth/signup.html",
      controller: 'AuthController as auth',
      resolve: {
        user: function (authService) {
          return authService.getUser();
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

var signIn = {
  name: 'signin',
  url: '/signin',
  views: {
    "navBarView": { templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc'  },
    "contentView": {
      templateUrl: basePath + "views/auth/signin.html",
      controller: 'AuthController as auth',
      resolve: {
        user: function (authService) {
          return authService.getUser();
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};



var campaign = {
  name: "campaign",
  url: "/campaign",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + 'views/campaign/campaign.html',
      controller: 'CampaignController as campaign',
      resolve: {
        isAuthorized: isAuthorized,
        user: function (authService) {
          return authService.getUser();
        },
        campaign: function(){
          return null;
        },
        campaigns: function(campaignService){
          return campaignService.list()
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

var newCampaign = {
  name: "new_campaign",
  url: "/campaign/new",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + 'views/campaign/new.html',
      controller: 'CampaignController as campaign',
      resolve: {
        isAuthorized: isAuthorized,
        user: function (authService) {
          return authService.getUser();
        },
        campaign: function(){
          return null;
        },
        campaigns: function(){
          return [];
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};
var editCampaign = {
  name: "edit_campaign",
  url: "/campaign/edit/:id",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + 'views/campaign/edit.html',
      controller: 'CampaignController as campaign',
      resolve: {
        isAuthorized: isAuthorized,
        user: function (authService) {
          return authService.getUser();
        },
        campaign: function(campaignService, $stateParams){
          return campaignService.getCampaign($stateParams.id);
        },
        campaigns: function(){
          return [];
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};
var links = {
  name: "links",
  url: "/links",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + 'views/links/add.html',
      controller: 'LinksController as linkc',
      resolve: {
        isAuthorized: isAuthorized,
        user: function (authService) {
          return authService.getUser();
        },
        programs: function(linksService){
          return linksService.getPrograms();
        },
        sites: function(linksService){
          return linksService.getSites();
        },
        campaigns: function(campaignService, $state){
          var campaignsList = campaignService.list();
          campaignsList.then(function(campaigns){
            if(campaigns.campaigns.length === 0){
              $state.go('campaign');
            }
          });
          return campaignsList;
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};
var terms = {
  name: "terms",
  url: "/terms",
  views: {
    "navBarView": {
      templateUrl: basePath + "views/navs/navbar.html",
      controller: 'NavBarController as navbarc'
    },
    "contentView": {
      templateUrl: basePath + "views/terms.html",
      controller: 'AuthController as auth',
      resolve: {
        user: function (authService) {
          return authService.getUser();
        }
      }
    },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
}
function run($rootScope, $state, $stateParams, authService) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  authService.getUser().then(function(currentUser){
    $rootScope.user = currentUser;
  });
  console.log('run app');
}

function config($urlRouterProvider, $stateProvider, ngClipProvider, $i18nextProvider) {
 WebFont.load({
   google: {
     families: ['Lato']
   }
 });
 $i18nextProvider.options = {
    lng: 'en',
    useCookie: false,
    useLocalStorage: false,
    fallbackLng: 'en',
    resGetPath: '/js/app/locales/__lng__/__ns__.json',
    defaultLoadingValue: ''
  };
  ngClipProvider.setPath('js/bower_components/zeroclipboard/dist/ZeroClipboard.swf');
  $urlRouterProvider.otherwise('/'); //Otherwise state
  $stateProvider
      .state(home)
      .state(signUp)
      .state(signIn)
      .state(campaign)
      .state(newCampaign)
      .state(editCampaign)
      .state(links)
      .state(terms);
};
angular.module('partnerWebApp', ['ui.router', 'ngResource', 'ngCookies', 'ui.bootstrap', 'ngClipboard','jm.i18next','datatables'])
    .run(run)
    .config(config);
