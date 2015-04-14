(function () {
  var ParameterCtrl;

  ParameterCtrl = (function () {
    function ParameterCtrl($log, $http, $timeout, $location, $scope, $rootScope, toaster, ngDialog, ParameterService) {
      this.$log = $log;
      this.$http = $http;
      this.$timeout = $timeout;
      this.$location = $location;
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.ParameterService = ParameterService;
      this.$log.debug("constructing ParameterCtrl");
      this.parameters = [];
      this.parameter = this.$scope.parameter || {};
      this.dialog = {};
      this.pager = {
        filter: {
          LIKES_name: ''
        },
        pageSize: 0
      };

      this.$scope.gridOptions = {
        data: 'pager.list',
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
        useExternalSorting: true,
        i18n: "zh-cn",
        enableColumnResize: true,
        showColumnMenu: true,
        totalServerItems: 'pager.count',
        pagingOptions: {
          pageSizes: [5, 10, 15],
          pageSize: 10,
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
      this.parameter = angular.copy(this.$scope.parameter);
      return this.ParameterService.saveParameter(this.parameter).then((function (_this) {
        return function (data) {
          _this.findParametersBy();
          _this.dialog.close();
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$log.debug("save parameter successfully");

        };
      })(this), (function (_this) {
        return function (error) {
          _this.$scope.error = error;
          return _this.$log.error("Unable to save parameter: " + error);
        };
      })(this));
    };

    ParameterCtrl.prototype.createParameter = function () {
      this.$scope.error = null;
      this.$scope.supplier = {};
      this.dialog = this.ngDialog.open({
        template: 'parameterSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveParameter();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("createParameter()");

    };

    ParameterCtrl.prototype.updateParameter = function (parameter) {
      this.$scope.error = null;
      this.$scope.parameter = angular.copy(parameter);
      this.dialog = this.ngDialog.open({
        template: 'parameterSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveParameter();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("updateParameter");

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
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findParametersBy();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to refresh parameter cache: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    return ParameterCtrl;

  })();

  angular.module('sbAdminApp').controller('ParameterCtrl', ParameterCtrl);

}).call(this);

