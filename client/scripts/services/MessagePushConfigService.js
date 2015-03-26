(function() {
  var MessagePushConfigService;

  MessagePushConfigService = (function() {
    MessagePushConfigService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    MessagePushConfigService.defaultConfig = {
      headers: MessagePushConfigService.headers
    };

    function MessagePushConfigService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing MessagePushService");
    }

    MessagePushConfigService.prototype.findmesspushconfig = function(pager) {
      var deferred;
      this.$log.debug("MessagePushService()");
      deferred = this.$q.defer();
      this.$http.post("/querymessconfig", pager).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully find MessagePush - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to find MessagePush - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    MessagePushConfigService.prototype.saveMessPush = function(MessPushVo) {
      var deferred;
      this.$log.debug("saveMessPush " + (angular.toJson(MessPushVo, true)));
      deferred = this.$q.defer();
      this.$http.post("/querymessconfig/save", MessPushVo).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully saveMessPush - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to saveMessPush - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    MessagePushConfigService.prototype.modifyMessPush = function(MessPushVo) {
      var deferred;
      this.$log.debug("modifyMessPush " + (angular.toJson(MessPushVo, true)));
      deferred = this.$q.defer();
      this.$http.post("/querymessconfig/update", MessPushVo).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully save MessPush - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to save MessPush - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return MessagePushConfigService;

  })();
  angular.module("sbAdminApp").service('MessagePushConfigService', MessagePushConfigService);
}).call(this);

