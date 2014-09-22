'use strict';
function AuthService($http, $q, $cookieStore) {
  var Auth = {};
  Auth.getUser = function () {
    return $cookieStore.get('user');
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
    var user = this.getUser(), deferred = $q.defer(), this_ = this;
    if (user) {
      $http.post('/affiliate/close')
          .success(function (status) {
            this_.setUser(null);
            deferred.resolve(status);
          }).error(function (err) {
            deferred.reject(err);
          });
      return deferred.promise;
    }
  };
  return Auth;
};

angular.module('partnerWebApp')
    .factory('AuthService', AuthService);