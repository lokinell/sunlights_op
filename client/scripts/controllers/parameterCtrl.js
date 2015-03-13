(function () {
    var ParameterCtrl;

    ParameterCtrl = (function () {
        function ParameterCtrl($log, $http, $timeout, $scope, $modal, ParameterService) {
            this.$log = $log;
            this.$http = $http;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$modal = $modal;
            this.ParameterService = ParameterService;
            this.$log.debug("constructing ParameterCtrl");
            this.parameters = [];
            this.parameter;
            this.editingRow = {};
            this.pager = {
                filter: {
                    LIKES_name: ''
                },
                pageSize: 0
            };
            this.$scope.editRow = (function (_this) {
                return function (row) {
                    return _this.editRow(row);
                };
            })(this);
            this.$scope.deleteRow = (function (_this) {
                return function (row) {
                    return _this.deleteRow(row);
                };
            })(this);
            this.$scope.open = (function (_this) {
                return function (isEditing) {
                    var modalInstance;
                    modalInstance = _this.$modal.open({
                        templateUrl: "parameterModal.html",
                        controller: "parameterModalInstanceCtrl",
                        resolve: {
                            selectedRow: function () {
                                if (isEditing) {
                                    return _this.parameter;
                                } else {
                                    return {};
                                }
                            }
                        }
                    });
                    return modalInstance.result.then((function (data) {
                        _this.$log.debug("result>>>>" + data);
                        _this.findParametersBy();
                        return _this.editingRow.entity = data;
                    }), function () {
                        return _this.$log.info("Modal dismissed at: " + new Date());
                    });
                };
            })(this);
            $scope.gridOptions = {
                data: 'pager.list',
                enablePaging: true,
                showFooter: true,
                multiSelect: false,
                totalServerItems: 'pager.count',
                pagingOptions: {
                    pageSizes: [5, 10, 15],
                    pageSize: 5,
                    currentPage: 1
                },
                columnDefs: [
                    {
                        field: 'name',
                        displayName: '参数名'
                    },
                    {
                        field: 'value',
                        displayName: '参数值'
                    },
                    {
                        field: 'description',
                        displayName: '参数描述'
                    },
                    {
                        field: 'locked',
                        displayName: '操作',
                        cellTemplate: 'views/parameter/parameterTypeCell.html'
                    }
                ]
            };
        }

        ParameterCtrl.prototype.findParametersBy = function () {
            this.$log.debug("findParametersBy()");
            this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
            return this.ParameterService.findParametersBy(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " Parameters");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get Parameters: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        ParameterCtrl.prototype.editRow = function (row) {
            var value;
            this.editingRow = row;
            value = angular.toJson(row.entity);
            this.$log.debug(value);
            this.parameter = value;
            return this.$scope.open(true);
        };

        ParameterCtrl.prototype.deleteRow = function (parameter) {
            this.$log.debug("deleteParameter()");
            return this.ParameterService.deleteParameter(parameter).then((function (_this) {
                return function (data) {
                    _this.$log.debug("successfully delete parameter");
                    return _this.findParametersBy();
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to delete parameter: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        return ParameterCtrl;

    })();

    angular.module('sbAdminApp').controller('ParameterCtrl', ParameterCtrl);

    angular.module('sbAdminApp').controller("parameterModalInstanceCtrl", function ($scope, $log, $location, $modalInstance, selectedRow, ParameterService) {
        $scope.row = angular.fromJson(selectedRow);
        $scope.ok = function () {
            ParameterService.saveParameter($scope.row);
            return $modalInstance.close($scope.row);
        };
        return $scope.cancel = function () {
            return $modalInstance.dismiss("cancel");
        };
    });

}).call(this);

