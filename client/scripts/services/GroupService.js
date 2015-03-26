(function() {
  var GroupService;
  GroupService = (function() {
    GroupService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    GroupService.defaultConfig = {
      headers: GroupService.headers
    };

    function GroupService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing GroupService");
    }

    GroupService.prototype.findGroups = function(pager) {
      var deferred;
      this.$log.info("findGroups " + (angular.toJson(pager, true)));
      deferred = this.$q.defer();
      this.$http.get(baseUrl + '/groups', {
        headers: {
          'params': encodeURIComponent(angular.toJson(pager))
        }
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find groups - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find groups - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    GroupService.prototype["delete"] = function(group) {
      var deferred;
      this.$log.debug("deleteGroup " + (angular.toJson(group, true)));
      deferred = this.$q.defer();
      this.   this.$http({
        method: 'DELETE',
        url: baseUrl + '/group',
        params: group
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully delete group - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to delete group - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    GroupService.prototype.save = function(group) {
      var deferred;
      this.$log.debug("saveGroup " + (angular.toJson(group, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl+"/group", group).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save group - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save group - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    GroupService.prototype.findCustomers = function(pager) {
      var deferred;
      this.$log.info("findCustomers " + (angular.toJson(pager, true)));
      deferred = this.$q.defer();
      this.$http.get(baseUrl + '/group/customers', {
        headers: {
          'params': encodeURIComponent(angular.toJson(pager))
        }
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find customers - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find customers - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    GroupService.prototype.addCustomers = function(pager) {
      var deferred;
      this.$log.debug("addCustomers " + (angular.toJson(pager, true)));
      deferred = this.$q.defer();
      this.$http.post("/group/customer", pager).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully add group customers - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to add group customers - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return GroupService;

  })();

  angular.module('sbAdminApp').service('GroupService', GroupService);

}).call(this);

