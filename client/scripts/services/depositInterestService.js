(function () {
    var DepositInterestService;

    DepositInterestService = (function () {
        DepositInterestService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        DepositInterestService.defaultConfig = {
            headers: DepositInterestService.headers
        };

        function DepositInterestService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing DepositInterestService");
        }

        DepositInterestService.prototype.findDepositInterests = function (pager) {
            var deferred;
            this.$log.debug("findDepositInterests() ");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/deposit/interests', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find DepositInterests - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find DepositInterests - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        DepositInterestService.prototype.saveDepositInterest = function (depositInterest) {
            var deferred;
            this.$log.debug("saveDepositInterest " + (angular.toJson(depositInterest, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/deposit/interest", depositInterest).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save depositInterest - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save depositInterest - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        DepositInterestService.prototype.deleteDepositInterest = function (depositInterest) {
            var deferred;
            this.$log.debug("deleteDepositInterest " + (angular.toJson(depositInterest, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/deposit/interest',
                params: depositInterest
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully delete depositInterest - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to delete depositInterest - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return DepositInterestService;

    })();

    angular.module('sbAdminApp').service('DepositInterestService', DepositInterestService);

}).call(this);

