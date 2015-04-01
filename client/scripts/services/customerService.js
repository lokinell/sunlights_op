/**
 * Created by Yuan on 2015/3/12.
 */
(function () {
    var CustomerService;

    CustomerService = (function () {
        CustomerService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        CustomerService.defaultConfig = {
            headers: CustomerService.headers
        };

        function CustomerService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing CustomerService");
        }

        CustomerService.prototype.findCustomersBy = function (pager) {
            var deferred;
            this.$log.debug("findCustomersBy " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customers', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully listed Customers - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to list Customers - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findCustomerByMobile = function (mobile) {
            var deferred;
            this.$log.debug("findCustomerByMobile " + (angular.toJson(mobile, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customer/detail/' + mobile).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully customer - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to customer - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.unlockCustomer = function (customer) {
            var deferred;
            this.$log.debug("unlockCustomer " + (angular.toJson(customer, true)));
            deferred = this.$q.defer();
            customer.status = 'T';
            this.$http.put("/customer", customer).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully unlock Customer - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to unlock Customer- status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findVerifyCodes = function (pager) {
            var deferred;
            this.$log.debug("findVerifyCodes");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/verifycodes', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find verify codes - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find verify codes - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };


        CustomerService.prototype.saveCustomer = function (customer) {
            var deferred;
            this.$log.debug("saveCustomer " + (angular.toJson(customer, true)));
            deferred = this.$q.defer();
            this.$http.put("/customer", customer).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save Customer - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save Customer- status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findBankCards = function (pager) {
            var deferred;
            this.$log.debug("findBankCards");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customer/bankcards', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find bank cards - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find bank cards - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findReferrers = function (pager) {
            var deferred;
            this.$log.debug("findReferrers");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customer/referrers', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find referrers - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find referrers - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findFundTrades = function (pager) {
            var deferred;
            this.$log.debug("findFundTrades");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customer/fund/trades', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find referrers - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find referrers - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findBalance = function (customer) {
            var deferred;
            this.$log.debug("findBalance");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customer/balance', {
                headers: {
                    'params': angular.toJson(customer)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find balance - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find balance - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findExchanges = function (pager) {
            var deferred;
            this.$log.debug("findExchanges");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customer/exchanges', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find exchanges - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find exchanges - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };


        return CustomerService;

    })();

    angular.module('sbAdminApp').service('CustomerService', CustomerService);

}).call(this);


