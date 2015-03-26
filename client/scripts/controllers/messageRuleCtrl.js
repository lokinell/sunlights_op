(function() {
  var MessageRuleCtrl;

  MessageRuleCtrl = (function() {
    function MessageRuleCtrl($modal, $rootScope, $http, $timeout, $log, $scope, $location, MessageRuleService) {
      this.$modal = $modal;
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$log = $log;
      this.$scope = $scope;
      this.$location = $location;
      this.MessageRuleService = MessageRuleService;
      this.$log.debug("constructing MessageRuleCtrl");
      this.pager = {
        filter: {
          LIKES_name: '',
          EQL_id: ''
        },
        index: 0,
        pageSize: 2,
        pageNum: 1
      };
      this.dicts = [];
      this.editingRow = {};
      this.parameter;
      this.dict = this.$rootScope.dict || {};
      this.$rootScope.dict = {};
      this.$scope.constant = {
        messpushconfigid: [],
        groupid: []
      };
      this.$scope.pageSizes = [10, 20, 30];
      this.$scope.columnDefs = [
        {
          field: "name",
          displayName: "规则名称"
        }, {
          field: "code",
          displayName: "规则编码"
        }, {
          field: "description",
          displayName: "规则描述"
        }, {
          field: "title",
          displayName: "推送标题"
        }, {
          field: "content",
          displayName: "展示内容"
        }, {
          field: "contentSms",
          displayName: "短信内容"
        }, {
          field: "contentPush",
          displayName: "推送内容"
        }, {
          field: "smsind",
          displayName: "短信标志",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.smsind== 'Y' ? '是' : '否'}}</span></div>"
        }, {
          field: "msgcenterind",
          displayName: "消息中心标志",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.msgcenterind== 'Y' ? '是' : '否'}}</span></div>"
        }, {
          field: "pushind",
          displayName: "推送标志",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.pushind== 'Y' ? '是' : '否'}}</span></div>"
        }, {
          field: "configremarks",
          displayName: "推送配置描述"
        }, {
          field: "stayDayInd",
          displayName: "30天显示",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.stayDayInd== 'Y' ? '是' : '否'}}</span></div>"
        }, {
          field: "groupname",
          displayName: "群发组名"
        }, {
          field: "createtime",
          displayName: "创建时间",
          cellFilter: "date:\"yyyy-MM-dd \""
        }, {
          field: "status",
          displayName: "有效",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status== 'Y' ? '是' : '否'}}</span></div>"
        }, {
          field: "locked",
          displayName: "操作",
          cellTemplate: "views/messagerule/messageRuleCell.html"
        }
      ];
      this.$scope.pageUrl = baseUrl+"/messagerules";
      new PageService(this.$scope, this.$http, this.$timeout);
      this.$scope.editRow = (function(_this) {
        return function(row) {
          return _this.editRow(row);
        };
      })(this);
      this.$scope.open = (function(_this) {
        return function(isEditing) {
          var modalInstance;
          modalInstance = _this.$modal.open({
            templateUrl: "messageRuleModel.html",
            controller: "MessageRuleModalCtrl",
            resolve: {
              selectedRow: function() {
                if (isEditing) {
                  return _this.parameter;
                } else {
                  return {};
                }
              }
            }
          });
          return modalInstance.result.then((function(data) {
            _this.$log.debug("result-----" + data);
            return _this.editingRow = data;
          }), function() {
            return _this.$log.info("Modal dismissed at: " + new Date());
          });
        };
      })(this);
    }

    MessageRuleCtrl.prototype.editRow = function(row) {
      var value;
      this.editingRow = row;
      this.$log.debug(row);
      value = angular.toJson(row.entity);
      this.$log.debug(value);
      this.parameter = row;
      return this.$scope.open(true);
    };

    MessageRuleCtrl.prototype.findmesspush = function() {
      this.$log.debug("findmesspush()");
      this.error = "";
      return this.MessageRuleService.findmesspush(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " MessagePush");
          _this.pager = data;
          return _this.dicts = data.list;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get MessagePush: " + error);
          return _this.error = error;
        };
      })(this));
    };

    MessageRuleCtrl.prototype.updateMessPush = function(dict) {
      this.$log.debug("updateMessPush()");
      this.dict = dict;
      this.$rootScope.dict = this.dict;
      return this.$location.path("/messpush/update");
    };

    MessageRuleCtrl.prototype.createMessPush = function() {
      this.$log.debug("createMessPush()");
      this.dict.status = "Y";
      this.$rootScope.dict = this.dict;
      return this.$location.path("/messpush/save");
    };

    MessageRuleCtrl.prototype.saveMessPush = function() {
      this.$log.debug("saveMessPush()");
      return this.MessageRuleService.saveMessPush(this.dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("save MessPush successfully");
          return _this.$location.path("/messpush");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to save MessPush: " + error);
          return _this.error = error;
        };
      })(this));
    };

    MessageRuleCtrl.prototype.modifyMessPush = function() {
      this.$log.debug("modifyMessPush()");
      return this.MessageRuleService.modifyMessPush(this.dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("modify MessagePushService successfully");
          return _this.$location.path("/messpush");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to modify messpush: " + error);
          return _this.error = error;
        };
      })(this));
    };

    MessageRuleCtrl.prototype.messpushconfigidData = function() {
      return this.MessageRuleService.messpushconfigidData().then((function(_this) {
        return function(data) {
          _this.$log.debug(data);
          _this.$scope.constant.messpushconfigid = data;
          return _this.$log.info("Successfully find messpushconfigidData:" + data);
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get messpushconfigid: " + error);
          return _this.error = error;
        };
      })(this));
    };

    MessageRuleCtrl.prototype.messpushgroupidData = function() {
      return this.MessageRuleService.messpushgroupidData().then((function(_this) {
        return function(data) {
          _this.$log.debug(data);
          _this.$scope.constant.groupid = data;
          return _this.$log.info("Successfully find groupid:" + data);
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get groupid: " + error);
          return _this.error = error;
        };
      })(this));
    };

    MessageRuleCtrl.prototype.AddToMessPushTxn = function(dict) {
      this.$log.debug("AddToMessPushTxn()");
      return this.MessageRuleService.AddToMessPushTxn(dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("modify AddToMessPushTxn successfully");
          return _this.error = {
            message: {
              detail: '返回结果：添加到群发消息推送记录成功'
            }
          };
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to AddToMessPushTxn messpush: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return MessageRuleCtrl;

  })();

  angular.module("sbAdminApp").controller('MessageRuleCtrl', MessageRuleCtrl);

  angular.module("sbAdminApp").controller("MessageRuleModalCtrl", function($scope, $log, $location, $modalInstance, selectedRow, MessagePushService) {
    this.$log = $log;
    $scope.myVar = false;
    $scope.myVar1 = true;
    $scope.myVar2 = true;
    $scope.messagePushVo = {};
    $scope.row = angular.fromJson(selectedRow);
    this.$log.debug("this is ----:" + $scope.row);
    $scope.ok = function() {
      return MessagePushService.AddToMessPushTxn($scope.row).then((function(_this) {
        return function(data) {
          $scope.messagePushVo = data.value;
          _this.error = {
            message: {
              detail: "保存成功"
            }
          };
          return $scope.toggle();
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.error = error;
        };
      })(this));
    };
    $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
    $scope.toggle = function() {
      $scope.myVar = !$scope.myVar;
      return $scope.myVar1 = !$scope.myVar;
    };
    $scope.toggle2 = function() {
      $scope.myVar1 = !$scope.myVar1;
      return $scope.myVar2 = !$scope.myVar1;
    };
    return $scope.immediatelyPush = function() {
      $scope.toggle2();
      return MessagePushService.immediatelyPush($scope.messagePushVo).then((function(_this) {
        return function(data) {
          return _this.error = {
            message: {
              detail: data
            }
          };
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.error = error;
        };
      })(this));
    };
  });

}).call(this);

