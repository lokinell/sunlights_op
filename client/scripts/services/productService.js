(function () {
    var ProductService;

    ProductService = (function () {
        ProductService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        ProductService.defaultConfig = {
            headers: ProductService.headers
        };

        function ProductService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing ProductService");
        }

        ProductService.prototype.findFunds = function (pager) {
            var deferred;
            this.$log.debug("findFunds()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/funds', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Funds - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Funds - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ProductService.prototype.findCodes = function (pager) {
            var deferred;
            this.$log.debug("findCodes()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/management/codes', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find codes - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find codes - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ProductService.prototype.findProductManages = function (pager) {
            var deferred;
            this.$log.debug("findProductManages()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/managements', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Product Manages - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Product Manages  - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ProductService.prototype.saveProductManage = function (productManage) {
            var deferred;
            this.$log.debug("saveProductManage " + (angular.toJson(productManage, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/management", productManage).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save product manage - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save product manage - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ProductService.prototype.deleteProductManage = function (productManage) {
            var deferred;
            this.$log.debug("deleteProductManage " + (angular.toJson(productManage, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/management',
                params: productManage
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully delete product manage - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to delete product manage  - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ProductService.prototype.grabProfitHistoryByCode = function (productManage) {
            var deferred;
            this.$log.debug("grabProfitHistoryByCode " + (angular.toJson(productManage, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/management/fund/profits", productManage).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully grab Profit History By Code - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to grab Profit History By Code - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        ProductService.prototype.grabAllProfitHistory = function () {
            var deferred;
            this.$log.debug("grabAllProfitHistory");
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/management/funds/profits").success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully grab All Profit History - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to grab All Profit History - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return ProductService;

    })();

    angular.module('sbAdminApp').service('ProductService', ProductService);

}).call(this);

