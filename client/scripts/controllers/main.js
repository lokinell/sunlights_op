'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
(function () {
    var MainCtrl;

    MainCtrl = (function () {
        function MainCtrl($scope, $log, $location, LoginService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.LoginService = LoginService;
            this.$log.debug("constructing MainCtrl");
            this.user = {};
            this.findCurrentUser();

        }

       MainCtrl.prototype.check = function (x) {
            this.$log.debug("check()");
            if (x == this.collapseVar)
                this.collapseVar = 0;
            else
                this.collapseVar = x;
            return;
        };

        MainCtrl.prototype.logout = function () {
            this.$log.debug("findCurrentUser()");
            localStorage.removeItem("user");
            this.$location.path("/login");
        };

        MainCtrl.prototype.findCurrentUser = function () {
            this.$log.debug("findCurrentUser()");
            return this.LoginService.findCurrentUser().then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned user successfully");
                    return _this.user = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get Suppliers: " + error);
                    _this.error = error;
                    return _this.$location.path("/login");
                };
            })(this));
        };

        return MainCtrl;

    })();

    angular.module('sbAdminApp').controller('MainCtrl', MainCtrl);

}).call(this);


