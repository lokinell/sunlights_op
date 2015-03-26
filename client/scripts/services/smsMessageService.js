(function() {
  var SmsMessageService;

  SmsMessageService = (function() {
    SmsMessageService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    SmsMessageService.defaultConfig = {
      headers: SmsMessageService.headers
    };

    function SmsMessageService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing SmsMessageService");
    }

    SmsMessageService.prototype.findSmsMessageVos = function(pager) {
      var deferred;
      this.$log.info("findSmsMessageVos " + (angular.toJson(pager, true)));
      deferred = this.$q.defer();
      this.$http.get(baseUrl + '/smsmessages', {
        headers: {
          'params': encodeURIComponent(angular.toJson(pager))
        }
      }).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find SmsMessages - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find SmsMessages - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return SmsMessageService;

  })();

  angular.module("sbAdminApp").service('SmsMessageService', SmsMessageService);

}).call(this);

