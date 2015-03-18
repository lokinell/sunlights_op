(function () {
    var LoginService;

    LoginService = (function () {
        LoginService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        LoginService.defaultConfig = {
            headers: LoginService.headers
        };

        function LoginService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing LoginService");
        }

        LoginService.prototype.findCurrentUser = function () {
            var deferred;
            this.$log.debug("findCurrentUser()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + "/login/user").success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully findCurrentUser - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to findCurrentUser - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        LoginService.prototype.login = function (user) {
            var deferred;
            this.$log.debug("login()");
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/login", user).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully login - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to login - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return LoginService;

    })();

    angular.module('sbAdminApp').service('LoginService', LoginService);

}).call(this);

