(function () {
    var ResourceService;

    ResourceService = (function () {
        ResourceService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        ResourceService.defaultConfig = {
            headers: ResourceService.headers
        };

        function ResourceService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing ResourceService");
        }

        ResourceService.prototype.findResources = function (pager) {
            var deferred;
            this.$log.debug("findResources()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/resources', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Resources - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Resources - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ResourceService.prototype.findTree = function (role) {
            var deferred;
            this.$log.debug("findTree");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/resource/tree', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(role))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully findTree - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to findTree - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return ResourceService;

    })();

    angular.module('sbAdminApp').service('ResourceService', ResourceService);

}).call(this);

