(function () {
    var RoleCtrl;

    RoleCtrl = (function () {
        function RoleCtrl($scope, $rootScope, $log, $location, RoleService, ResourceService, TreeData) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$log = $log;
            this.$location = $location;
            this.RoleService = RoleService;
            this.ResourceService = ResourceService;
            this.TreeData = TreeData;
            this.$log.debug("constructing RoleCtrl");
            this.roles = [];
            this.role = this.$rootScope.role || {};
            this.$rootScope.role = {};
            this.pager = {};
            this.tree = {};
            this.menus = [];
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
                        cellTemplate: 'views/authority/role/operation.html'
                    }
                ]
            };
        }

        RoleCtrl.prototype.findTree = function () {
            this.$log.debug("findTree()");
            return this.ResourceService.findTree(this.role).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned findTree");
                    _this.menus[0] = data.value;
                    return _this.tree = new _this.TreeData([data.value]);
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

        RoleCtrl.prototype.saveRole = function () {
            this.$log.debug("saveRole()");
            this.role.deleted = !this.role.deleted;
            var resourceIds = [];
            this.selectedTree(this.tree.tree[0], resourceIds);
            this.role.resourceIds = resourceIds;
            return this.RoleService.saveRole(this.role).then((function (_this) {
                return function (data) {
                    _this.$log.debug("save role successfully");
                    return _this.$location.path("/dashboard/role");
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to save role: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        RoleCtrl.prototype.createRole = function () {
            this.$log.debug("createRole()");
            this.$rootScope.role.deleted = true;
            return this.$location.path("/dashboard/role/save");
        };

        RoleCtrl.prototype.updateRole = function (row) {
            this.$log.debug("updateRole()");
            this.role = row.entity;
            this.$rootScope.role = this.role;
            this.$rootScope.role.deleted = !this.role.deleted;
            return this.$location.path("/dashboard/role/save");
        };

        RoleCtrl.prototype.deleteRole = function (row) {
            this.$log.debug("deleteRole()");
            this.role = row.entity;
            this.role.deleted = true;
            return this.RoleService.saveRole(this.role).then((function (_this) {
                return function (data) {
                    _this.$log.debug("successfully delete role");
                    return _this.findRoles();
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to delete role: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        RoleCtrl.prototype.selectedTree = function (tree, resourceIds) {
            if (tree.checked) {
                resourceIds.push(tree.id)
            }
            var items = tree.items;
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

