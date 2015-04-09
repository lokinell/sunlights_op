(function () {
    var ParameterCtrl;

  ParameterCtrl = (function () {
    function ParameterCtrl($log, $http, $timeout, $location, $scope, $rootScope, ParameterService, toaster) {
      this.$log = $log;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$location = $location;
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.ParameterService = ParameterService;
      this.toaster = toaster;
      this.$log.debug("constructing ParameterCtrl");
      this.parameters = [];
      this.parameter = this.$rootScope.parameter || {};
      this.$rootScope.parameter = {};
      this.pager = {
        filter: {
          LIKES_name: ''
        },
        pageSize: 0
      };

            $scope.gridOptions = {
                data: 'pager.list',
                enablePaging: true,
                showFooter: true,
                multiSelect: false,
                i18n: "zh-cn",
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

    ParameterCtrl.prototype.saveParameter = function () {
      this.$log.debug("saveParameter()");
      return this.ParameterService.saveParameter(this.parameter).then((function (_this) {
        return function (data) {
          _this.$log.debug("save parameter successfully");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$location.path("/dashboard/parameter");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to save parameter: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    ParameterCtrl.prototype.createParameter = function () {
      this.$log.debug("createParameter()");
      return this.$location.path("/dashboard/parameter/save");
    };

    ParameterCtrl.prototype.updateParameter = function (parameter) {
      this.$log.debug("updateParameter");
      this.$rootScope.parameter = parameter;
      return this.$location.path("/dashboard/parameter/save");
    };


    ParameterCtrl.prototype.deleteParameter = function (parameter) {
      this.$log.debug("deleteParameter()");
      return this.ParameterService.deleteParameter(parameter).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete parameter");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findParametersBy();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete parameter: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    ParameterCtrl.prototype.refreshParameter = function () {
      this.$log.debug("refreshParameter()");
      return this.ParameterService.refreshParameter().then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully refresh parameter cache");
          return _this.findParametersBy();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to refresh parameter cache: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return ParameterCtrl;

  })();

  angular.module('sbAdminApp').controller('ParameterCtrl', ParameterCtrl);

}).call(this);

