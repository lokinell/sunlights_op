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
            this.editMessageRule = {};
            this.messageRule = this.$rootScope.messageRule || {};
            this.$rootScope.messageRule = {};
            this.$scope.constant = {
                messPushConfigId: [],
                groupId: []
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
                    field: "msgCenterInd",
                    displayName: "消息中心标志",
                    cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.msgCenterInd== 'Y' ? '是' : '否'}}</span></div>"
                },{
                    field: "content",
                    displayName: "展示内容"
                }, {
                    field: "smsInd",
                    displayName: "短信标志",
                    cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.smsInd== 'Y' ? '是' : '否'}}</span></div>"
                },{
                    field: "contentSms",
                    displayName: "短信内容"
                }, {
                    field: "pushInd",
                    displayName: "推送标志",
                    cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.pushInd== 'Y' ? '是' : '否'}}</span></div>"
                }, {
                    field: "contentPush",
                    displayName: "推送内容"
                }, {
                    field: "configRemarks",
                    displayName: "推送配置描述"
                }, {
                    field: "groupName",
                    displayName: "群发组名"
                }, {
                    field: "stayDays",
                    displayName: "作用天数"
                }, {
                    field: "status",
                    displayName: "有效",
                    cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status== 'Y' ? '是' : '否'}}</span></div>"
                }, {
                    field: "operate",
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
                        templateUrl: "messagePushModel.html",
                        controller: "MessagePushModalCtrl",
                        resolve: {
                            selectedRow: function() {
                                return _this.editMessageRule;
                            }
                        }
                    });
                    return modalInstance.result.then((function(data) {
                        return _this.editMessageRule = data;
                    }), function() {
                        return _this.$log.info("Modal dismissed at: " + new Date());
                    });
                };
            })(this);
        }

        MessageRuleCtrl.prototype.editRow = function(row) {
            this.editMessageRule = row;
            this.$log.debug("edit row " + angular.toJson(row));
            return this.$scope.open(true);
        };

        MessageRuleCtrl.prototype.findMessagePush = function() {
            this.$log.debug("findMessagePush()");
            this.error = "";
            return this.MessageRuleService.findMessagePush(this.pager).then((function(_this) {
                return function(data) {
                    _this.$log.debug("Promise returned " + data.length + " MessagePush");
                    _this.pager = data;
                    return data.list;
                };
            })(this), (function(_this) {
                return function(error) {
                    _this.$log.error("Unable to get MessagePush: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        MessageRuleCtrl.prototype.updateMessPush = function(messageRule) {
            this.$log.debug("updateMessPush()");
            this.messageRule = messageRule;
            this.$rootScope.messageRule = this.messageRule;
            return this.$location.path("/dashboard/messagerule/update");
        };

        MessageRuleCtrl.prototype.createMessPush = function() {
            this.$log.debug("createMessPush()");
            this.messageRule.status = "Y";
            this.messageRule.stayDays = 1;
            this.$rootScope.messageRule = this.messageRule;
            return this.$location.path("/dashboard/messagerule/save");
        };

        MessageRuleCtrl.prototype.saveMessPush = function() {
            this.$log.debug("saveMessPush()");
            return this.MessageRuleService.saveMessPush(this.messageRule).then((function(_this) {
                return function(data) {
                    _this.$log.debug("save MessPush successfully");
                    return _this.$location.path("/dashboard/messagerule");
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
            return this.MessageRuleService.modifyMessPush(this.messageRule).then((function(_this) {
                return function(data) {
                    _this.$log.debug("modify MessagePushService successfully");
                    return _this.$location.path("/dashboard/messagerule");
                };
            })(this), (function(_this) {
                return function(error) {
                    _this.$log.error("Unable to modify messpush: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        MessageRuleCtrl.prototype.configurationData = function() {
            return this.MessageRuleService.configurationData().then((function(_this) {
                return function(data) {
                    _this.$log.debug(data);
                    _this.$scope.constant.messPushConfigId = data;
                    return _this.$log.info("Successfully find configurationData:" + data);
                };
            })(this), (function(_this) {
                return function(error) {
                    _this.$log.error("Unable to get configurationData: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        MessageRuleCtrl.prototype.groupData = function() {
            return this.MessageRuleService.groupData().then((function(_this) {
                return function(data) {
                    _this.$log.debug(data);
                    _this.$scope.constant.groupId = data;
                    return _this.$log.info("Successfully find groupId:" + data);
                };
            })(this), (function(_this) {
                return function(error) {
                    _this.$log.error("Unable to get groupId: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        MessageRuleCtrl.prototype.AddToMessPushTxn = function(msgPushVo) {
            this.$log.debug("AddToMessPushTxn()");
            return this.MessageRuleService.AddToMessPushTxn(msgPushVo).then((function(_this) {
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

    angular.module("sbAdminApp").controller("MessagePushModalCtrl", function($scope, $log, $location, $modalInstance, selectedRow, MessageRuleService) {
        $scope.addPushHideFlag = false;
        $scope.pushHideFlag = true;
        $scope.closeHideFlag = true;
        $scope.messagePushVo = {};
        $scope.row = angular.fromJson(selectedRow);
        $scope.ok = function() {
            return MessageRuleService.AddToMessPushTxn($scope.row).then((function(_this) {
                return function(data) {
                    $scope.messagePushVo = data.value;
                    _this.error = {
                        message: {
                            detail: "保存成功"
                        }
                    };
                    return $scope.transAddToPush();
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
        $scope.transAddToPush = function() {
            $scope.addPushHideFlag = !$scope.addPushHideFlag;
            return $scope.pushHideFlag = !$scope.addPushHideFlag;
        };
        $scope.transPushToClose = function() {
            $scope.pushHideFlag = !$scope.pushHideFlag;
            return $scope.closeHideFlag = !$scope.pushHideFlag;
        };
        return $scope.immediatelyPush = function() {
            $scope.transPushToClose();
            return MessageRuleService.immediatelyPush($scope.messagePushVo).then((function(_this) {
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

