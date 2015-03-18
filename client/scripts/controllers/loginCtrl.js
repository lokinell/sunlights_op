(function () {
    var LoginCtrl;

    LoginCtrl = (function () {
        function LoginCtrl($scope, $log, $location, LoginService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.LoginService = LoginService;
            this.$log.debug("constructing LoginCtrl");
            this.user = {};
        }

        LoginCtrl.prototype.findCurrentUser = function () {
            this.$log.debug("findCurrentUser()");
            return this.LoginService.findCurrentUser().then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned user successfully");
                    return _this.user = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get Suppliers: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        LoginCtrl.prototype.login = function () {
            this.$log.debug("findCurrentUser()");
            return this.LoginService.login(this.user).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise login  successfully");
                    localStorage.setItem("user", angular.toJson(data.value));
                    _this.user = data.value;
                    return _this.$location.path("/dashboard/home");
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable login: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        return LoginCtrl;

    })();

    angular.module('sbAdminApp').controller('LoginCtrl', LoginCtrl);

}).call(this);

