(function () {
  var RoleCtrl;

  RoleCtrl = (function () {
    function RoleCtrl($scope, $rootScope, $log, $location, RoleService, ResourceService, TreeData, toaster, ngDialog) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.RoleService = RoleService;
      this.ResourceService = ResourceService;
      this.TreeData = TreeData;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.$log.debug("constructing RoleCtrl");
      this.roles = [];
      this.role = this.$scope.role || {};
      this.pager = {};
      this.tree = this.$scope.tree || {};
      this.menus = [];
      this.dialog = {};
      this.$scope.gridOptions = {
        data: 'pager.list',
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
        totalServerItems: 'pager.count',
        pagingOptions: {
          pageSizes: [5, 10, 15],
          pageSize: 10,
          currentPage: 1
        },
        columnDefs: [
          {
            field: 'name',
            displayName: '名称'
          },
          {
            field: 'code',
            displayName: '代码'
          },
          {
            field: 'desc',
            displayName: '描述'
          },
          {
            field: "createTime",
            displayName: '创建时间',
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          },
          {
            field: "updateTime",
            displayName: '更新时间',
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          },
          {
            field: "deleted",
            displayName: '有效',
            cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.deleted ? '否' : '是'}}</span></div>"
          },
          {
            field: null,
            displayName: '操作',
            cellTemplate: 'views/authority/role/operation.html'
          }
        ]
      };
    }

    RoleCtrl.prototype.findTree = function () {
      this.$log.debug("findTree()");
      return this.ResourceService.findTree(this.role).then((function (_this) {
        return function (data) {

          _this.menus[0] = data.value;
          _this.tree = new _this.TreeData([data.value]);
          return _this.$log.debug("Promise returned findTree");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to findTree: " + error);
          return _this.error = error;
        };
      })(this));
    };

    RoleCtrl.prototype.findRoles = function () {
      this.$log.debug("findRoles()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.RoleService.findRoles(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Roles");
          return _this.$scope.pager = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Roles: " + error);
          return _this.error = error;
        };
      })(this));
    };

    RoleCtrl.prototype.saveRole = function (resourceIds) {
      this.$log.debug("saveRole()");
      this.role = angular.copy(this.$scope.role);
      this.role.deleted = !this.role.deleted;

      this.role.resourceIds = resourceIds;
      return this.RoleService.saveRole(this.role).then((function (_this) {
        return function (data) {
          _this.findRoles();
          _this.dialog.close();
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$log.debug("save role successfully");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$scope.error = error;
          return _this.$log.error("Unable to save role: " + error);
        };
      })(this));
    };

    RoleCtrl.prototype.createRole = function () {
      this.$scope.error = null;
      this.$scope.role = {deleted: true};
      this.dialog = this.ngDialog.open({
        template: 'roleSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (tree) {
            _this.$log.debug("preCloseCallback()");
            if (typeof(tree) === 'object') {
              var resourceIds = [];
              _this.selectedTree(tree.tree[0], resourceIds);
              _this.saveRole(resourceIds);
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("createRole()");
    };

    RoleCtrl.prototype.updateRole = function (row) {
      this.role = row.entity;
      this.$scope.role = this.role;
      this.$scope.role.deleted = !this.role.deleted;
      this.dialog = this.ngDialog.open({
        template: 'roleSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (tree) {
            _this.$log.debug("preCloseCallback()");
            if (typeof(tree) === 'object') {
              var resourceIds = [];
              _this.selectedTree(tree.tree[0], resourceIds);
              _this.saveRole(resourceIds);
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("updateRole()");
    };

    RoleCtrl.prototype.deleteRole = function (row) {
      this.$log.debug("deleteRole()");
      this.role = row.entity;
      this.role.deleted = true;
      return this.RoleService.saveRole(this.role).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete role");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findRoles();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete role: " + error);
          _this.toaster.pop('error', data.message.summary, data.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    RoleCtrl.prototype.selectedTree = function (tree, resourceIds) {
      if (tree.checked) {
        resourceIds.push(tree.id)
      }
      var items = tree.items;
      if (!items) return;
      var _i, _len;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        this.selectedTree(items[_i], resourceIds);
      }
      return resourceIds;
    };

    return RoleCtrl;

  })();

  angular.module('sbAdminApp').controller('RoleCtrl', RoleCtrl);

}).call(this);

