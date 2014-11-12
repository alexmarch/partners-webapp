function LinksController($scope, programs, sites, campaigns, user, $modal, $sce, $state){
  $scope.sites = sites;
  $scope.programs = programs;
  $scope.campaigns = campaigns;
  $scope.mouseOverState = 0;
  $scope.domainName = sites[0].domainName;
  $scope.page = 'index.php';
  $scope.campaignID = campaigns.campaigns[0].id;
  $scope.currentProgramId = programs[1].programID;
  $scope.target = '_top';
  $scope.partnerID = user.tracking.code;
  $scope.updateField = angular.bind(this,this.updateField);
  $scope.openGeneratedTag = angular.bind(this, this.openGeneratedTag);
  $scope.changeProgram = angular.bind(this, this.changeProgram);
  $scope.regPageRadioChange = angular.bind(this, this.regPageRadioChange);
  //fix#1
  this.$scope = $scope;
  this.$modal = $modal;
};

LinksController.prototype = {
  openGeneratedTag : function(){
    var this_ = this;
    this.$modal.open({
      templateUrl: 'js/app/views/modals/htmlLinkModal.html',
      controller: 'HtmlModalController',
      size: 'lg',
      backdrop: false,
      resolve: {
        link: function () {
          return {
            url: angular.element('#linkHref').text().trim(),
            target: this_.$scope.target,
            onMouseOver: this_.$scope.mouseOverState};
        }
      }
    });
  }
};

function HtmlModalController($scope,link, $modalInstance){
  $scope.link = link;
  $scope.linkText = 'This is simple text';
  this.$scope = $scope;
  this.$modalInstance = $modalInstance;
  this.genereteLink($scope.linkText);
  $scope.endClipCopy = angular.bind(this, this.endClipCopy);
  $scope.updateLink = angular.bind(this, this.updateLink);
  $scope.cancel = angular.bind(this, this.cancel);
};

HtmlModalController.prototype = {
  regPageRadioChange: function(){
    console.log("Reg Page Radio change");
  },
  endClipCopy: function(){
    this.$modalInstance.close();
  },
  cancel: function(){
    this.$modalInstance.close();
  },
  updateLink: function(linkText){
    console.log(linkText);
    this.genereteLink(linkText);
  },
  changeProgram: function () {
    console.log(this.$scope.currentProgramId);
    this.$scope.page = this.$scope.currentProgramId === 102 ? 'member/register' : 'performer/register';
  },
  genereteLink: function(linkText){
    this.$scope.linkTag = '<a href="' + this.$scope.link.url + '" target="' + this.$scope.link.target + '" '+(this.$scope.link.onMouseOver ? 'onMouseOver="window.location=this; return true;"' : '')+'">'+linkText+'</a>';
  }
};

angular.module('partnerWebApp').controller('LinksController', LinksController);

//angular.module('partnerWebApp')
//    .controller('HtmlModalController', HtmlModalController);
