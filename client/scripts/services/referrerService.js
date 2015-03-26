/**
 * Created by Yuan on 2015/3/25.
 */
(function () {
    var ReferrerService;

    ReferrerService = (function () {
        ReferrerService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        ReferrerService.defaultConfig = {
            headers: ReferrerService.headers
        };

        function ReferrerService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing ReferrerService");
        }

        ReferrerService.prototype.findReferrers = function (pager) {
            var deferred;
            this.$log.info("findReferrers " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/referrers', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Referrers - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Referrers - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ReferrerService.prototype.findReferrerDetails = function (pager) {
            var deferred;
            this.$log.info("findReferrerDetails " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/referrer/details', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Referrer details - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Referrer details - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };


        return ReferrerService;

    })();

    angular.module('sbAdminApp').service('ReferrerService', ReferrerService);

}).call(this);

