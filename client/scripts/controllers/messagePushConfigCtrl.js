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
            this.pager = {
                index: 0,
                pageSize: 2,
                pageNum: 1
            };
            this.pushConfig = {};
            this.$scope.pageSizes = [10, 20, 30];
            this.$scope.columnDefs = [
                {
                    field: "remarks",
                    displayName: "配置描述"
                }, {
                    field: "platformDes",
                    displayName: "推送平台"
                }, {
                    field: "pushTypeDes",
                    displayName: "推送类型"
                }, {
                    field: "planBeginTime",
                    displayName: "推送计划开始时",
                    cellFilter: "date:\"yyyy-MM-dd HH:mm\""
                }, {
                    field: "planEndTime",
                    displayName: "推送计划截至时",
                    cellFilter: "date:\"yyyy-MM-dd HH:mm\""
                }, {
                    field: "pushTimedInd",
                    displayName: "是否定时",
                    cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.pushTimedInd== 'Y' ? '是' : '否'}}</span></div>"
                }, {
                    field: "status",
                    displayName: "有效标志",
                    cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status== 'Y' ? '是' : '否'}}</span></div>"
                }, {
                    field: "operate",
                    displayName: "操作",
                    cellTemplate: "views/messpushconfig/messagePushConfigCell.html"
                }
            ];
            this.$scope.pageUrl =baseUrl+ "/message/configs";
            new PageService(this.$scope, this.$http, this.$timeout);

            this.$scope.openMsgPushConfigModal = (function(_this) {
                return function(isEditing) {
                    var modalInstance;
                    modalInstance = _this.$modal.open({
                        templateUrl: "messagePushConfigModal.html",
                        controller: "MessagePushConfigModalCtrl",
                        resolve: {
                            selectedRow: function() {
                                return _this.pushConfig;
                            }
                        }
                    });
                    return modalInstance.result.then((function(selectedItem) {
                        return _this.$scope.selected = selectedItem;
                    }), function() {
                        return _this.$log.debug("Modal dismissed at: " + new Date());
                    });
                };
            })(this);
        }

        MessagePushConfigCtrl.prototype.findMessPushConfig = function() {
            this.$log.debug("findMessPushConfig()");
            return this.MessagePushConfigService.findMessPushConfig(this.pager).then((function(_this) {
                return function(data) {
                    _this.$log.debug("Promise returned " + data.length + " MessagePush");
                    _this.pager = data;
                    return _this.dicts = data.list;
                };
            })(this), (function(_this) {
                return function(error) {
                    _this.$log.error("Unable to get findMessPushConfig: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        MessagePushConfigCtrl.prototype.updateMessPush = function(pushConfig) {
            this.$log.debug("updateMessPush()");
            this.pushConfig = pushConfig;
            this.pushConfig = this.pushConfig;
            return this.$scope.openMsgPushConfigModal(true);
        };

        MessagePushConfigCtrl.prototype.createMessPush = function() {
            this.$log.debug("createMessPush()");
            this.pushConfig = {
                'status': 'Y',
                'pushTimedInd' : 'N' ,
                'platform': 'FP.PUSH.PLATFORM.1'
            };
            return this.$scope.openMsgPushConfigModal(false);
        };

        MessagePushConfigCtrl.prototype.saveMessPush = function() {
            this.$log.debug("saveMessPush()");
            return this.MessagePushConfigService.saveMessPush(this.pushConfig).then((function(_this) {
                return function(data) {
                    _this.$log.debug("save pushConfig successfully");
                    return _this.$location.path("/dashboard/messageConfig");
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
            return this.MessagePushConfigService.modifyMessPush(this.pushConfig).then((function(_this) {
                return function(data) {
                    _this.$log.debug("modify pushConfig successfully");
                    return _this.$location.path("/dashboard/messageConfig");
                };
            })(this), (function(_this) {
                return function(error) {
                    _this.$log.error("Unable to modify pushConfig: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        return MessagePushConfigCtrl;

    })();

    angular.module("sbAdminApp").controller('MessagePushConfigCtrl', MessagePushConfigCtrl);

    angular.module("sbAdminApp").controller("MessagePushConfigModalCtrl", function($scope, $log, $modalInstance, selectedRow, MessagePushConfigService) {
        $scope.pushConfig = angular.fromJson(selectedRow);
        var pushConfigId = $scope.pushConfig.id;
        $scope.ok = function() {
            if (pushConfigId == null) {
                MessagePushConfigService.saveMessPush($scope.pushConfig);
            }else{
                MessagePushConfigService.modifyMessPush($scope.pushConfig);
            }
            $modalInstance.close($scope.pushConfig);
            return window.parent.location.reload();
        };
        return $scope.cancel = function() {
            return $modalInstance.dismiss("cancel");
        };
    });

}).call(this);

