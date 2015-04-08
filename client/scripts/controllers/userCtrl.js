(function () {
  var UserCtrl;

  UserCtrl = (function () {
    function UserCtrl($scope, $rootScope, $log, $location, UserService, RoleService, toaster) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.UserService = UserService;
      this.RoleService = RoleService;
      this.toaster = toaster;
      this.$log.debug("constructing UserCtrl");
      this.users = [];
      this.user = this.$rootScope.user || {};
      this.$rootScope.user = {};
      this.pager = {};
      this.roles = [];
      this.selectedRoleIds = [];
      $scope.gridOptions = {
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
            field: 'username',
            displayName: '用户名'
          },
          {
            field: 'zhName',
            displayName: '中文名'
          },
          {
            field: 'email',
            displayName: '邮箱'
          },
          {
            field: 'telephone',
            displayName: '手机'
          },
          {
            field: 'status',
            displayName: '状态',
            cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status == 'Y' ? '启用' : '禁用'}}</span></div>"
          },
          {
            field: "createTime",
            displayName: '创建时间',
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          },
          {
            field: "updateTime",
            displayName: '创建时间',
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
            cellTemplate: 'views/authority/user/operation.html'
          }
        ]
      };
    }

    UserCtrl.prototype.initSave = function () {
      this.$log.debug("initSave()");
      return this.findRoles();
    };

    UserCtrl.prototype.findRoles = function () {
      this.$log.debug("findRoles()");
      return this.RoleService.findRoles({}).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Roles");
          return _this.roles = data.value.list;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Roles: " + error);
          return _this.error = error;
        };
      })(this));
    };

    UserCtrl.prototype.findUsers = function () {
      this.$log.debug("findUsers()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.UserService.findUsers(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Users");
          return _this.$scope.pager = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Users: " + error);
          return _this.error = error;
        };
      })(this));
    };

    UserCtrl.prototype.saveUser = function () {
      this.$log.debug("saveUser()");
      this.user.deleted = !this.user.deleted;
      return this.UserService.saveUser(this.user).then((function (_this) {
        return function (data) {
          _this.$log.debug("save user successfully");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$location.path("/dashboard/user");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to save user: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    UserCtrl.prototype.createUser = function () {
      this.$log.debug("createUser()");
      this.$rootScope.user.deleted = true;
      return this.$location.path("/dashboard/user/save");
    };

    UserCtrl.prototype.updateUser = function (row) {
      this.$log.debug("updateUser()");
      this.user = row.entity;
      this.$rootScope.user = this.user;
      this.$rootScope.user.deleted = !this.user.deleted;
      return this.$location.path("/dashboard/user/save");
    };

    UserCtrl.prototype.deleteUser = function (row) {
      this.$log.debug("deleteUser()");
      this.user = row.entity;
      this.user.deleted = true;
      return this.UserService.saveUser(this.user).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete user");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findUsers();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete user: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    return UserCtrl;

  })();

  angular.module('sbAdminApp').controller('UserCtrl', UserCtrl);

}).call(this);

