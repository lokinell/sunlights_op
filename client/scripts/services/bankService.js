/**
 * Created by Yuan on 2015/3/17.
 */
(function () {
    var BankService;

    BankService = (function () {
        BankService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        BankService.defaultConfig = {
            headers: BankService.headers
        };

        function BankService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing BankService");
        }

        BankService.prototype.findBanks = function (pager) {
            var deferred;
            this.$log.debug("findBanks()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/banks', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Banks - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Banks - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        BankService.prototype.saveBank = function (bank) {
            var deferred;
            this.$log.debug("saveBank " + (angular.toJson(bank, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/bank", bank).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save bank - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save bank - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        BankService.prototype.deleteBank = function (bank) {
            var deferred;
            this.$log.debug("deleteBank " + (angular.toJson(bank, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/bank',
                params: bank
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully delete bank - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to delete bank - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return BankService;

    })();

    angular.module('sbAdminApp').service('BankService', BankService);

}).call(this);


