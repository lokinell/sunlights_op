(function () {
    var UserService;

    UserService = (function () {
        UserService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        UserService.defaultConfig = {
            headers: UserService.headers
        };

        function UserService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing UserService");
        }

        UserService.prototype.findUsers = function (pager) {
            var deferred;
            this.$log.debug("findUsers()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/users', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Users - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Users - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        UserService.prototype.saveUser = function (user) {
            var deferred;
            this.$log.debug("saveUser " + (angular.toJson(user, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/user", user).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save user - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save user - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return UserService;

    })();

    angular.module('sbAdminApp').service('UserService', UserService);

}).call(this);

