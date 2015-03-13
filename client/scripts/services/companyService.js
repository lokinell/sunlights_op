(function() {
  var CompanyService;

  CompanyService = (function() {
    CompanyService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    CompanyService.defaultConfig = {
      headers: CompanyService.headers
    };

    function CompanyService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing CompanyService");
    }

    CompanyService.prototype.findCompanies = function(pager) {
      var deferred;
      this.$log.debug("findCompanies()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl+'/fund/companies', {
        headers: {
          'params': angular.toJson(pager)
        }
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find Companies - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find Companies - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return CompanyService;

  })();

  angular.module('sbAdminApp').service('CompanyService', CompanyService);

}).call(this);

