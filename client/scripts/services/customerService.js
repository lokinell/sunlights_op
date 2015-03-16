/**
 * Created by Yuan on 2015/3/12.
 */
(function() {
    var CustomerService;

    CustomerService = (function() {
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

        CustomerService.prototype.findCustomersBy = function(pager) {
            var deferred;
            this.$log.debug("findCustomersBy " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/customers', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function(_this) {
                return function(data, status, headers) {
                    _this.$log.info("Successfully listed Customers - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function(_this) {
                return function(data, status, headers) {
                    _this.$log.error("Failed to list Customers - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.unlockCustomer = function(customer) {
            var deferred;
            this.$log.debug("unlockCustomer " + (angular.toJson(customer, true)));
            deferred = this.$q.defer();
            this.$http.put("/customer", customer).success((function(_this) {
                return function(data, status, headers) {
                    _this.$log.info("Successfully unlock Customer - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function(_this) {
                return function(data, status, headers) {
                    _this.$log.error("Failed to unlock Customer- status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        CustomerService.prototype.findVerifyCodes = function(pager) {
            var deferred;
            this.$log.debug("findVerifyCodes");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/verifycodes', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function(_this) {
                return function(data, status, headers) {
                    _this.$log.info("Successfully find verify codes - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function(_this) {
                return function(data, status, headers) {
                    _this.$log.error("Failed to find verify codes - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return CustomerService;

    })();

    angular.module('sbAdminApp').service('CustomerService', CustomerService);

}).call(this);


