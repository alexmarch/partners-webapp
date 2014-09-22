/**
 * Initialize application
 */
'use strict';

var basePath = 'js/app/';

var home = {
  name: "home",
  url: "/",
  views: {
    "navBarView": { templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc' },
    "contentView": { templateUrl: basePath + "views/auth/signup.html", controller: 'AuthController as auth' },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

var signUp = {
  name: "signup",
  url: "/signup",
  views: {
    "navBarView": { templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc'  },
    "contentView": { templateUrl: basePath + "views/auth/signup.html", controller: 'AuthController as auth' },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

var signIn = {
  name: 'signin',
  url: '/signin',
  views: {
    "navBarView": { templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc'  },
    "contentView": { templateUrl: basePath + "views/auth/signin.html", controller: 'AuthController as auth' },
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

var dashboardState = {
  name: "dashboard",
  url: '/dashboard/:id',
  views: {
    "navBarView": {templateUrl: basePath + "views/navs/navbar.html", controller: 'NavBarController as navbarc' },
    "contentView": {templateUrl: basePath + 'views/dashboard/dashboard.html'},
    "footerView": {templateUrl: basePath + "views/footer/footer.html"}
  }
};

function run($rootScope, $state, $stateParams){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}

function config($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/'); //Otherwise state
  $stateProvider
      .state(home)
      .state(signUp)
      .state(signIn)
      .state(dashboardState);
};
angular.module('partnerWebApp', ['ui.router', 'ngCookies'])
    .run(run)
    .config(config);


