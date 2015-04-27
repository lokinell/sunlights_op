(function() {
  var MessageRuleService;

  MessageRuleService = (function() {
    MessageRuleService.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    MessageRuleService.defaultConfig = {
      headers: MessageRuleService.headers
    };

    function MessageRuleService($log, $http, $q) {
      this.$log = $log;
      this.$http = $http;
      this.$q = $q;
      this.$log.debug("constructing MessagePushService");
    }

    MessageRuleService.prototype.findMessagePush = function(pager) {
      var deferred;
      this.$log.debug("MessageRuleService()");
      deferred = this.$q.defer();
      this.$http.get(baseUrl + '/messagerules', {
        headers: {
          'params': encodeURIComponent(angular.toJson(pager))
        }
      }).success((function(_this) {
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

    MessageRuleService.prototype.saveMessPush = function(MessPushVo) {
      var deferred;
      this.$log.debug("saveMessPush " + (angular.toJson(MessPushVo, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/messagerule", MessPushVo).success((function(_this) {
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

    MessageRuleService.prototype.modifyMessPush = function(MessPushVo) {
      var deferred;
      this.$log.debug("modifyMessPush " + (angular.toJson(MessPushVo, true)));
      deferred = this.$q.defer();
      this.$http.put(baseUrl + "/messagerule", MessPushVo).success((function(_this) {
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

    MessageRuleService.prototype.configurationData = function() {
      var deferred;
      deferred = this.$q.defer();
        this.$http.get(baseUrl + '/messagerule/configrations')
            .success((function (_this) {
            return function (data, status, headers) {
                _this.$log.info("Successfully find configrations - status " + status);
                return deferred.resolve(data);
            };
        })(this)).error((function (_this) {
            return function (data, status, headers) {
                _this.$log.error("Failed to find configrations - status " + status);
                return deferred.reject(data);
            };
        })(this));
        return deferred.promise;
    };

    MessageRuleService.prototype.groupData = function() {
      var deferred;
      deferred = this.$q.defer();
        this.$http.get(baseUrl + '/messagerule/groups')
            .success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find groups - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find groups - status " + status);
                    return deferred.reject(data);
                };
            })(this));
        return deferred.promise;
    };

    MessageRuleService.prototype.AddToMessPushTxn = function(MessPushVo) {
      var deferred;
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/messagerule/txn", MessPushVo).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully AddToMessPushTxn - status " + status);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to AddToMessPushTxn - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    MessageRuleService.prototype.immediatelyPush = function(MessPushVo) {
      var deferred;
      this.$log.debug("immediatelyPush " + (angular.toJson(MessPushVo, true)));
      deferred = this.$q.defer();
      this.$http.post(baseUrl + "/messagerule/immediately", MessPushVo).success((function(_this) {
        return function(data, status, headers) {
          _this.$log.info("Successfully immediatelyPush - status " + status + " - - " + data);
          return deferred.resolve(data);
        };
      })(this)).error((function(_this) {
        return function(data, status, headers) {
          _this.$log.error("Failed to immediatelyPush - status " + status);
          return deferred.reject(data);
        };
      })(this));
      return deferred.promise;
    };

    return MessageRuleService;

  })();

  angular.module("sbAdminApp").service('MessageRuleService', MessageRuleService);

}).call(this);

