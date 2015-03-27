(function() {
  var GroupCtrl;

  GroupCtrl = (function() {
    function GroupCtrl($log, $modal, $rootScope, $http, $timeout, $scope, $location, GroupService) {
      this.$log = $log;
      this.$modal = $modal;
      this.$rootScope = $rootScope;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$scope = $scope;
      this.$location = $location;
      this.GroupService = GroupService;
      this.$log.debug("constructing GroupCtrl");
      this.pager = {
        filter: {
          LIKES_name: '',
          EQS_status: ''
        },
        index: 0,
        pageSize: 10,
        pageNum: 1
      };
      this.customers = [];
      this.group = this.$rootScope.group || {};
      this.editingRow = {};
      this.groupCustomerPager = {
        filter: {
          customerFilter: '',
          groupId: 0
        },
        index: 0,
        pageSize: 10,
        pageNum: 1,
        list: []
      };
      this.$rootScope.group = {};
      this.status = [
        {
          key: '',
          value: '全部'
        }, {
          key: 'Y',
          value: '有效'
        }, {
          key: 'N',
          value: '无效'
        }
      ];
      this.$scope.pageSizes = [10, 20, 50];
      this.$scope.columnDefs = [
        {
          field: "name",
          displayName: "名称"
        }, {
          field: "code",
          displayName: "编码"
        }, {
          field: "description",
          displayName: "描述"
        }, {
          field: "level",
          displayName: "级别"
        }, {
          field: "customerNum",
          displayName: "已有成员数"
        }, {
          field: "status",
          displayName: "状态",
          cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status== 'Y' ? '有效' : '无效'}}</span></div>"
        }, {
          field: "locked",
          displayName: "操作",
          cellTemplate: "views/group/groupsCell.html"
        }
      ];
      this.$scope.pageUrl = baseUrl+"/groups";
      new PageService(this.$scope, this.$http, this.$timeout);
      this.$scope.open = (function(_this) {
        return function(isEditing) {
          var modalInstance;
          modalInstance = _this.$modal.open({
            templateUrl: "groupModal.html",
            controller: "groupModalInstanceCtrl",
            resolve: {
              selectedRow: function() {
                if (isEditing) {
                  return _this.group;
                } else {
                  return _this.group = {
                    status: 'Y'
                  };
                }
              }
            }
          });
          return modalInstance.result.then((function(data) {
            _this.$log.debug("result>>>>" + angular.toJson(data));
            return _this.editingRow = data;
          }), function() {
            return _this.$log.info("Modal dismissed at: " + new Date());
          });
        };
      })(this);
    }

    GroupCtrl.prototype.editRow = function(row) {
      this.editingRow = row;
      this.$log.debug("update group");
      this.group = row;
      return this.$scope.open(true);
    };

    GroupCtrl.prototype.deleteRow = function(row) {
      if (!confirm("Are you really delete group?")) {
        return;
      }
      this.$log.debug("delete group");
      this.$log.debug(row);
      return this.GroupService["delete"](row).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully delete group");
          return _this.findGroups();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to delete group: " + error);
          return _this.error = error;
        };
      })(this));
    };

    GroupCtrl.prototype.findGroups = function() {
      this.$log.debug("GroupService findGroups");
      return this.GroupService.findGroups(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Groups");
          _this.groups = data.value.list;
          return _this.pager.count = data.value.count;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.error = error;
          alert(error);
          return _this.$log.error("Unable to get Groups: " + error);
        };
      })(this));
    };

    GroupCtrl.prototype.config = function(row) {
      this.$log.debug("config");
      this.group = row;
      this.groupCustomerPager.filter.groupId = row.id;
      this.$rootScope.group = this.group;
      return this.$location.path("/group/config");
    };

    GroupCtrl.prototype.findCustomers = function() {
      this.$log.debug("GroupService findCustomers");
      return this.GroupService.findCustomers(this.groupCustomerPager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Customers");
          _this.customers = data.value.list;
          _this.groupCustomerPager.list = data.value.list;
          return _this.$log.debug(_this.groupCustomerPager.list);
        };
      })(this), (function(_this) {
        return function(error) {
          _this.error = error;
          alert(error);
          return _this.$log.error("Unable to get Customers: " + error);
        };
      })(this));
    };

    GroupCtrl.prototype.addCustomers = function() {
      this.$log.debug("add group customers");
      this.$log.debug(this.groupCustomerPager);
      this.$log.debug(this.customers);
      this.$log.debug("---------------");
      this.groupCustomerPager.filter.groupId = this.group.id;
      this.$log.debug("--------2-------");
      this.$log.debug(this.group.id);
      return this.GroupService.addCustomers(this.groupCustomerPager).then((function(_this) {
        return function(data) {
          _this.$log.debug("successfully add group customers");
          return _this.$location.path("/group");
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to add group customers: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return GroupCtrl;

  })();

  angular.module('sbAdminApp').controller('GroupCtrl', GroupCtrl);

  angular.module('sbAdminApp').controller("groupModalInstanceCtrl", function($scope, $log, $location, $modalInstance, selectedRow, GroupService) {
    console.info($scope.row);
    $scope.row = angular.fromJson(selectedRow);
    $scope.ok = function() {
      GroupService.save($scope.row);
      $modalInstance.close($scope.row);
    };
    return $scope.cancel = function() {
      return $modalInstance.dismiss("cancel");
    };
  });
}).call(this);

