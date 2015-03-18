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
        }

        MainCtrl.prototype.logout = function () {
            this.$log.debug("findCurrentUser()");
            localStorage.removeItem("user");
            this.$location.path("/login");
        };

        return MainCtrl;

    })();

    angular.module('sbAdminApp').controller('MainCtrl', MainCtrl);

}).call(this);


