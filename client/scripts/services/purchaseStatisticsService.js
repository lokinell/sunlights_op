/**
 * Created by Yuan on 2015/3/26.
 */
(function () {
    var PurchaseStatisticsService;

    PurchaseStatisticsService = (function () {
        PurchaseStatisticsService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        PurchaseStatisticsService.defaultConfig = {
            headers: PurchaseStatisticsService.headers
        };

        function PurchaseStatisticsService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing PurchaseStatisticsService");
        }

        PurchaseStatisticsService.prototype.findFirstPurchases = function (pager) {
            var deferred;
            this.$log.info("findFirstPurchases " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/statistics/purchases', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find FirstPurchases - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find FirstPurchases - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        PurchaseStatisticsService.prototype.findUnPurchases = function (pager) {
            var deferred;
            this.$log.info("UnPurchases " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/statistics/unpurchases', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find UnPurchases - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find UnPurchases - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return PurchaseStatisticsService;

    })();

    angular.module('sbAdminApp').service('PurchaseStatisticsService', PurchaseStatisticsService);

}).call(this);

