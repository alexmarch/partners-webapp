function LinksService($q, $http){
  var links = {};
  links.getPrograms = function(){
    var deferred = $q.defer();
    $http.get('/programs').success(function(programs){
      deferred.resolve(programs);
    }).error(function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  };
  links.getSites = function(){
    var deferred = $q.defer();
    $http.get('/sites').success(function(links){
      deferred.resolve(links);
    }).error(function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  };
  return links
};

angular.module('partnerWebApp')
    .factory('linksService', LinksService);
