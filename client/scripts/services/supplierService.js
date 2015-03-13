(function () {
    var SupplierService;

    SupplierService = (function () {
        SupplierService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        SupplierService.defaultConfig = {
            headers: SupplierService.headers
        };

        function SupplierService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing SupplierService");
        }

        SupplierService.prototype.findSuppliers = function (pager) {
            var deferred;
            this.$log.debug("findSuppliers()");
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/suppliers', {
                headers: {
                    'params': angular.toJson(pager)
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Suppliers - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Suppliers - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        SupplierService.prototype.saveSupplier = function (supplier) {
            var deferred;
            this.$log.debug("saveSupplier " + (angular.toJson(supplier, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/supplier", supplier).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save supplier - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save supplier - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        SupplierService.prototype.deleteSupplier = function (supplier) {
            var deferred;
            this.$log.debug("deleteSupplier " + (angular.toJson(supplier, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/supplier',
                params: supplier
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully delete supplier - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to delete supplier - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return SupplierService;

    })();

    angular.module('sbAdminApp').service('SupplierService', SupplierService);

}).call(this);

