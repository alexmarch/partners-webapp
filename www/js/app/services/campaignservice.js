function CampaignService($http, $q){
  var Campaign = {};
  Campaign.create = function(campaign){
    var deferred = $q.defer();
    $http.post('/campaign/new', campaign)
        .success(function(campaign){
          deferred.resolve(campaign);
        }).error(function(err){
          deferred.reject(err);
        });
    return deferred.promise;
  };
  Campaign.list = function(){
    var deferred = $q.defer();
    $http.get('/campaign/list').success(function(list){
      deferred.resolve(list);
    }).error(function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  };
  Campaign.delete = function(id){
    var deferred = $q.defer();
    $http.delete('/campaign/delete/'+id).success(function(delRecords){
      deferred.resolve(delRecords);
    }).error(function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  };
  Campaign.getCampaign = function(id){
    var deferred = $q.defer();
    $http.get('/campaign/edit/'+id).success(function(campaign){
      deferred.resolve(campaign)
    }).error(function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  };
  Campaign.update = function(campaign){
    var deferred = $q.defer();
    $http.put('/campaign/update',campaign).success(function(campaign){
      deferred.resolve(campaign);
    }).error(function(err){
      deferred.reject(err)
    });
    return deferred.promise;
  };
  return Campaign;
};
angular.module('partnerWebApp')
    .factory('campaignService', CampaignService);
