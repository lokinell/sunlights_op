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
        function MainCtrl($scope, $log, $location, LoginService, $q, $http) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.LoginService = LoginService;
            this.$log.debug("constructing MainCtrl");
            this.user = {};
            this.$q = $q;
            this.$http = $http;
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
            this.$log.debug("logout ");
            localStorage.removeItem("user");
            var deferred;
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/login/user'
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully logout - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to logout - status " + status);
                    return deferred.reject(data);
                };
            })(this));

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


