(function() {
  var ObtainRuleModalInstanceCtrl;

  ObtainRuleModalInstanceCtrl = (function() {
    function ObtainRuleModalInstanceCtrl($scope, $log, $location, modalInstance, selectedRow, activityId, ObtainRewardRulesService, ActivityShareInfoService, ruleConstant) {
      var vm;
      this.$scope = $scope;
      this.$log = $log;
      this.$location = $location;
      this.modalInstance = modalInstance;
      this.selectedRow = selectedRow;
      this.activityId = activityId;
      this.ObtainRewardRulesService = ObtainRewardRulesService;
      this.ActivityShareInfoService = ActivityShareInfoService;
      this.ruleConstant = ruleConstant;
      this.$log.debug("constructing ObtainRuleModalInstanceCtrl");
      this.$scope.row = angular.fromJson(selectedRow);
      this.$scope.ruleConstant = angular.fromJson(ruleConstant);
      vm = this.$scope.vm = {};
      this.$scope.rule = {};
      this.$scope.share = {};
      this.$scope.row;
      this.$scope.ruleDatas = [];
      this.$scope.shareDatas = [];
      this.$scope.isNomal = (function(_this) {
        return function(row) {
          return row.getProperty("status") === "N";
        };
      })(this);
      this.$scope.isInviter = (function(_this) {
        return function(row) {
          return row.getProperty("inviter") === 1;
        };
      })(this);
      ObtainRewardRulesService.findRules(activityId).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.length + " activities");
          return _this.$scope.ruleDatas = data;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get activities: " + error);
        };
      })(this));

      this.$scope.editRule = (function(_this) {
        return function(row) {
          _this.$scope.rule = row.entity;
          return _this.$scope.row = row.rowIndex;
        };
      })(this);
      this.$scope.addrule = (function(_this) {
        return function() {
          return _this.$scope.rule = {};
        };
      })(this);
      this.$scope.queryrule = (function(_this) {
        return function() {
          return _this.queryRule();
        };
      })(this);
      this.$scope.deleteRule = (function(_this) {
        return function(row) {
          return ObtainRewardRulesService.deleteRule(row.entity).then(function(data) {
            $log.debug("Promise returned " + data + " activities");
            return _this.queryRule();
          }, function(error) {
            return $log.error("Unable to get activities: " + error);
          });
        };
      })(this);



      this.$scope.gridOptions = {
        columnDefs: [
          {
            field: 'rewardTypeStr',
            displayName: '奖励类型'
          }, {
            field: 'status',
            displayName: '状态',
            cellTemplate: 'views/cell/statuscell.html'
          }, {
            field: 'inviter',
            displayName: '是否推荐人',
            cellTemplate: 'views/cell/invitercell.html'
          }, {
            field: 'shouldReward',
            displayName: '应发奖励'
          }, {
            field: 'locked',
            displayName: '操作',
            cellTemplate: 'views/cell/obatinRule.html'
          }
        ],
        multiSelect: false,
        data: 'ruleDatas',
        useExternalSorting: true,
        i18n: "zh-cn",
        enableColumnResize: true,
        showColumnMenu: true
      };
      this.$scope.okRule = function() {
        $scope.rule.activityId = activityId;
        return ObtainRewardRulesService.saveRule($scope.rule).then((function(_this) {
          return function(data) {
            $log.debug("Promise returned " + data + " rules");
            if (data.id) {
              $scope.rule.id = data.id;
              $scope.rule.rewardTypeStr = data.rewardTypeStr;
              $scope.ruleDatas[$scope.ruleDatas.length] = $scope.rule;
              return $scope.rule = {};
            } else {
              return $scope.ruleDatas[$scope.row] = $scope.rule;
            }
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error("Unable to get rules: " + error);
          };
        })(this));
      };

      this.$scope.ok = function() {
        $scope.rule.id = activityId;
        ObtainRewardRulesService.saveRule($scope.rule);
        modalInstance.close($scope.rule);
        return window.location.reload();
      };
      this.$scope.cancel = function() {
        return modalInstance.dismiss("cancel");
      };
    }



    ObtainRuleModalInstanceCtrl.prototype.queryRule = function() {
      return this.ObtainRewardRulesService.findRules(this.activityId).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data + " activities");
          return _this.$scope.ruleDatas = data;
        };
      })(this), (function(_this) {
        return function(error) {
          return _this.$log.error("Unable to get activities: " + error);
        };
      })(this));
    };

    return ObtainRuleModalInstanceCtrl;

  })();

  angular.module('sbAdminApp').controller('obtainRuleModalInstanceCtrl', ['$scope', '$log', '$location', '$modalInstance', 'selectedRow', 'activityId', 'ObtainRewardRulesService', 'ActivityShareInfoService', 'ruleConstant', ObtainRuleModalInstanceCtrl]);





}).call(this);

