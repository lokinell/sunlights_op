(function () {
    var ExchangeResultService;

    ExchangeResultService = (function () {
        ExchangeResultService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        ExchangeResultService.defaultConfig = {
            headers: ExchangeResultService.headers
        };

        function ExchangeResultService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing ExchangeResultService");
        }

        ExchangeResultService.prototype.findRedPackets = function (pageVo) {
            var deferred;
            this.$log.debug("findExchangeResults()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/exchangeresult/reds', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pageVo))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find red packets exchange- status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find red packets exchange - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return ExchangeResultService;

    })();

    angular.module('sbAdminApp').service('ExchangeResultService', ExchangeResultService);

}).call(this);

