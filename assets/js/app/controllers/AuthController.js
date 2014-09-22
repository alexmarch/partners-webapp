function AuthController($scope, $log, $location, AuthService) {
  if (AuthService.getUser()) {
    $location.path('/dashboard/' + AuthService.getUser().id);
  };
  this.initForm = {
    name: "",
    password: "",
    email: "",
    passwordConfirmation: ""
  };
  this.scope = $scope;
  this.scope.form = this.initForm;
  this.scope.errors = {};
  this.authService = AuthService;
  this.log = $log;
  this.location = $location;
  /**
   * Binding events
   */
  this.scope.signup = angular.bind(this, this.signup);
  this.scope.signin = angular.bind(this, this.signin);
};

AuthController.prototype = {
  signup: function () {
    var this_ = this;
    this.authService.create(this.scope.form)
        .then(function (user) {
          if (user) {
            this_.scope.form = this_.initForm;
            this_.location.path('/dashboard/' + user.id);
          }
        })
        .catch(function (err) {
          if (err.hasOwnProperty('invalidAttributes')) {
            this_.scope.errors = err.invalidAttributes;
          }
        });
  },
  signin: function () {
    var this_ = this;
    this.authService.new(this.scope.form)
        .then(function (user) {
          if (user) {
            this_.scope.form = this_.initForm;
            this_.location.path('/dashboard/' + user.id);
          }
        })
        .catch(function (err) {
          if (err.hasOwnProperty('invalidAttributes')) {
            this_.scope.errors = err.invalidAttributes;
          } else if (err.hasOwnProperty('message')) {
            this_.scope.errorMessage = err.message;
          }
        });
  }
}
angular.module('partnerWebApp')
    .controller('AuthController', AuthController);
