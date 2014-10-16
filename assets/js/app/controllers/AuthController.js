function AuthController($scope, $log, $location, authService, user, $state) {
  if (angular.isDefined(user.id)) {
    $state.go('dashboard');
  };

  this.initForm = {
    name: "",
    password: "",
    email: "",
    passwordConfirmation: ""
  };

  this.scope = $scope;
  this.scope.preload = false;
  this.scope.errors = {};
  this.authService = authService;
  this.log = $log;
  this.location = $location;
  this.scope.termsCheckbox = false;
  /**
   * Binding events
   */
  this.scope.signup = angular.bind(this, this.signup);
  this.scope.signin = angular.bind(this, this.signin);
  this.scope.termsChange = angular.bind(this, this.termsChange);
};

AuthController.prototype = {
  signup: function () {
    var this_ = this;
    this.scope.preload = true;
    if(!this.scope.termsCheckbox){
      this.scope.errors = {
        terms:[{
          message: 'Confirm Terms & Conditions !'
        }]
      };
      this.scope.preload = false;
      return;
    }
    this.authService.create(this.scope.form)
        .then(function (res) {
          if (res.message) {
            this_.scope.preload = false;
            this_.scope.form = this_.initForm;
            this_.scope.messages = res.message;
          }
        })
        .catch(function (err) {
          this_.scope.preload = false;
          if (err.hasOwnProperty('invalidAttributes')) {
            this_.scope.errors = err.invalidAttributes;
          }
        });
  },
  signin: function () {
    var this_ = this;
    this.scope.preload = true;
    this.authService.new(this.scope.form)
        .then(function (res) {
          if (res.user) {
            this_.scope.preload = false;
            this_.scope.form = this_.initForm;
            this_.location.path('/dashboard/' + res.user.id);
          }else if(res.message){
            this_scope.messages = res.message
          }
        })
        .catch(function (err) {
          this_.scope.preload = false;
          if (err.hasOwnProperty('invalidAttributes')) {
            this_.scope.errors = err.invalidAttributes;
          } else if (err.hasOwnProperty('message')) {
            this_.scope.errorMessage = err.message;
            console.log(this_.initForm);
            this_.scope.form = angular.copy(this_.initForm);
          }
        });
  },
  termsChange: function(){
    if(this.scope.termsCheckbox){
      this.scope.errors = {};
    }
  }
}
angular.module('partnerWebApp')
    .controller('AuthController', AuthController);
