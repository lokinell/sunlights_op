(function() {
  var MessagePushConfigCtrl;

  MessagePushConfigCtrl = (function() {
    function MessagePushConfigCtrl($modal, $rootScope, $http, $timeout, $log, $scope, $location, MessagePushConfigService) {
      this.$modal = $modal;
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$log = $log;
      this.$scope = $scope;
      this.$location = $location;
      this.MessagePushConfigService = MessagePushConfigService;
      this.$log.debug("constructing MessagePushCtrl");
      this.pager = {
        filter: {
          EQS_status: ''
        },
        index: 0,
        pageSize: 2,
        pageNum: 1
      };
      this.dicts = [];
      this.dict = this.$rootScope.dict || {};
      this.$rootScope.dict = {};
      this.$scope.constant = {
        messpushconfigid: [],
        groupid: []
      };
      this.$scope.pageSizes = [5, 10, 20];
      this.$scope.columnDefs = [
        {
          field: "remarks",
          displayName: "配置描述"
        }, {
          field: "platformdes",
          displayName: "推送平台"
        }, {
          field: "pushtypedes",
          displayName: "推送类型"
        }, {
          field: "planbegintime",
          displayName: "推送计划开始时"
        }, {
          field: "planendtime",
          displayName: "推送计划截至时"
        }, {
          field: "pushtimed",
          displayName: "是否定时",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.pushtimed== 'Y' ? '是' : '否'}}</span></div>"
        }, {
          field: "status",
          displayName: "有效标志",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status== 'Y' ? '是' : '否'}}</span></div>"
        }, {
          field: "createtime",
          displayName: "创建时间",
          cellFilter: "date:\"yyyy-MM-dd \""
        }, {
          field: "updatetime",
          displayName: "修改时间",
          cellFilter: "date:\"yyyy-MM-dd \""
        }, {
          field: "locked",
          displayName: "操作",
          cellTemplate: "views/messpushconfig/messagePushConfigCell.html"
        }
      ];
      this.$scope.pageUrl =baseUrl+ "/message/configs";
      new PageService(this.$scope, this.$http, this.$timeout);
    }

    MessagePushConfigCtrl.prototype.findmesspushconfig = function() {
      this.$log.debug("findmesspushconfig()");
      return this.MessagePushConfigService.findmesspushconfig(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " MessagePush");
          _this.pager = data;
          return _this.dicts = data.list;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get findmesspushconfig: " + error);
          return _this.error = error;
        };
      })(this));
    };

    MessagePushConfigCtrl.prototype.updateMessPush = function(dict) {
      this.$log.debug("updateMessPush()");
      this.dict = dict;
      this.$rootScope.dict = this.dict;
      return this.$location.path("/messpushconfig/update");
    };

    MessagePushConfigCtrl.prototype.createMessPush = function() {
      this.$log.debug("createMessPush()");
      this.dict.status = "Y";
      this.$rootScope.dict = this.dict;
      return this.$location.path("/messpushconfig/save");
    };

    MessagePushConfigCtrl.prototype.saveMessPush = function() {
      this.$log.debug("saveMessPush()");
      return this.MessagePushConfigService.saveMessPush(this.dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("save messpushconfig successfully");
          return _this.$location.path("/messpushconfig");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to save MessPush: " + error);
          return _this.error = error;
        };
      })(this));
    };

    MessagePushConfigCtrl.prototype.modifyMessPush = function() {
      this.$log.debug("modifyMessPush()");
      return this.MessagePushConfigService.modifyMessPush(this.dict).then((function(_this) {
        return function(data) {
          _this.$log.debug("modify messpushconfig successfully");
          return _this.$location.path("/messpushconfig");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to modify messpush: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return MessagePushConfigCtrl;

  })();

  angular.module("sbAdminApp").controller('MessagePushConfigCtrl', MessagePushConfigCtrl);

}).call(this);

