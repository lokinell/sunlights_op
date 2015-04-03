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
            var currentUser = localStorage.getItem("user");
            if (!currentUser) {
                this.$location.path('/login');
            } else {
                this.user = angular.fromJson(currentUser);
            }
        };

        return MainCtrl;

    })();

    angular.module('sbAdminApp').controller('MainCtrl', MainCtrl);

}).call(this);


