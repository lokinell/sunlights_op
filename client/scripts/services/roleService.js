(function () {
    var RoleService;

    RoleService = (function () {
        RoleService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        RoleService.defaultConfig = {
            headers: RoleService.headers
        };

        function RoleService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing RoleService");
        }

        RoleService.prototype.findRoles = function (pager) {
            var deferred;
            this.$log.debug("findRoles()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/roles', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Roles - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Roles - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        RoleService.prototype.saveRole = function (role) {
            var deferred;
            this.$log.debug("saveRole " + (angular.toJson(role, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/role", role).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save role - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save role - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return RoleService;

    })();

    angular.module('sbAdminApp').service('RoleService', RoleService);

}).call(this);

