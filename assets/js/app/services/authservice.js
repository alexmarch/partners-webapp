'use strict';
function AuthService($http, $q, $cookieStore, $location, $state) {
  var Auth = {};

  Auth.getUser = function () {
    var user = $http.get('/affiliate/current/user');
    var deferred = $q.defer();
    user.success(function (u) {
      deferred.resolve(u);
    }).error(function () {
      deferred.reject();
    });
    return deferred.promise;
  };

  Auth.setUser = function (user) {
    $cookieStore.put('user', user);
  };

  Auth.new = function (user) {
    var deferred = $q.defer(), this_ = this;
    $http.post('/affiliate/new', {name: user.name, password: user.password})
        .success(function (user) {
          this_.setUser(user);
          deferred.resolve(user);
        })
        .error(function (err) {
          deferred.reject(err)
        });
    return deferred.promise;
  };

  /**
   * Create new affiliate
   * @param user
   * @returns {Deferred.promise|*}
   */
  Auth.create = function (user) {
    var this_ = this, deferred = $q.defer();

    $http.post("/affiliate/create", user)
        .success(function (user) {
          this_.setUser(user);
          deferred.resolve(user);
        })
        .error(function (err) {
          deferred.reject(err);
        });
    return deferred.promise;
  };

  /**
   * End affiliate session
   * @returns {Deferred.promise|*}
   */
  Auth.close = function () {
    var deferred = $q.defer(), this_ = this;
    $http.post('/affiliate/close')
        .success(function (status) {
          deferred.resolve(status);
        }).error(function (err) {
          deferred.reject(err);
        });
    return deferred.promise;
  };

  Auth.isAuthorized = function () {
    var user = this.getUser();
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
return Auth;
};

angular.module('partnerWebApp')
    .factory('authService', AuthService);