(function () {
    var ParameterService;

    ParameterService = (function () {
        ParameterService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        ParameterService.defaultConfig = {
            headers: ParameterService.headers
        };

        function ParameterService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing ParameterService");
        }

        ParameterService.prototype.findParametersBy = function (pager) {
            var deferred;
            this.$log.info("findParametersBy " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/parameters', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find parameters - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find parameters - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ParameterService.prototype.deleteParameter = function (parameter) {
            var deferred;
            this.$log.debug("deleteParameter " + (angular.toJson(parameter, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/parameter',
                params: parameter
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully delete parameter - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to delete parameter - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ParameterService.prototype.saveParameter = function (parameter) {
            var deferred;
            this.$log.debug("saveParameter " + (angular.toJson(parameter, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/parameter", parameter).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save parameter - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save parameter - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ParameterService.prototype.refreshParameter = function () {
            var deferred;
            this.$log.debug("refreshParameter ");
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/parameter/refresh'
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully refresh parameter cache - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to refresh parameter cache - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return ParameterService;

    })();

    angular.module('sbAdminApp').service('ParameterService', ParameterService);

}).call(this);

