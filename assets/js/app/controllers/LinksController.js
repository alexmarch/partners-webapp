function LinksController($scope,programs,sites, campaigns){
  $scope.sites = sites;
  $scope.programs = programs;
  $scope.campaigns = campaigns;
  $scope.mouseOverState = 0;
  $scope.domainName = sites[0].domainName;
  $scope.linkUrl = sites[0].domainName;
  $scope.currentProgramId = programs[1].programID;
  $scope.target = '_top';
  $scope.fulllink = $scope.domainName;
};
angular.module('partnerWebApp')
    .controller('LinksController', LinksController);