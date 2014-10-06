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
  this.scope.form = this.initForm;
  this.scope.errors = {};
  this.authService = authService;
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
    this.scope.preload = true;
    this.authService.create(this.scope.form)
        .then(function (user) {
          if (user) {
            this_.scope.preload = false;
            this_.scope.form = this_.initForm;
            this_.location.path('/dashboard/' + user.id);
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
        .then(function (user) {
          if (user) {
            this_.scope.preload = false;
            this_.scope.form = this_.initForm;
            this_.location.path('/dashboard/' + user.id);
          }
        })
        .catch(function (err) {
          this_.scope.preload = false;
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
