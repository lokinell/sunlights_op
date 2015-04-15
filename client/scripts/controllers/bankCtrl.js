/**
 * Created by Yuan on 2015/3/17.
 */
(function () {
  var BankCtrl;

  BankCtrl = (function () {
    function BankCtrl($scope, $rootScope, $log, $location, toaster, ngDialog, BankService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.BankService = BankService;
      this.toaster = toaster;
      this.$log.debug("constructing BankCtrl");
      this.banks = [];
      this.bank = this.$scope.bank || {};
      this.pager = {};
      this.dialog = {};
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
            field: "bankName",
            displayName: "银行名称"
          },
          {
            field: "bankCode",
            displayName: "银行代码"
          },
          {
            field: "enName",
            displayName: "英文名称"
          },
          {
            field: "createdTime",
            displayName: "创建时间",
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          },
          {
            field: "updateTime",
            displayName: "更新时间",
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          },
          {
            field: "status",
            displayName: "状态"
          },
          {
            field: null,
            displayName: "操作",
            cellTemplate: "views/bank/operation.html"
          }
        ]
      };
    }

    BankCtrl.prototype.findBanks = function () {
      this.$log.debug("findBanks()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.BankService.findBanks(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Banks");
          return _this.$scope.pager = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Banks: " + error);
          return _this.error = error;
        };
      })(this));
    };

    BankCtrl.prototype.saveBank = function () {
      this.$log.debug("saveBank()");
      this.bank = angular.copy(this.$scope.bank)
      return this.BankService.saveBank(this.bank).then((function (_this) {
        return function (data) {
          _this.findBanks();
          _this.dialog.close();
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$log.debug("save bank successfully");

        };
      })(this), (function (_this) {
        return function (error) {
          _this.$scope.error = error;
          return _this.$log.error("Unable to save bank: " + error);
        };
      })(this));
    };

    BankCtrl.prototype.createBank = function () {
      this.$scope.error = null;
      this.$scope.bank = {};
      this.dialog = this.ngDialog.open({
        template: 'bankSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveBank();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("createBank()");

    };

    BankCtrl.prototype.updateBank = function (bank) {
      this.$scope.error = null;
      this.$scope.bank = angular.copy(bank);
      this.dialog = this.ngDialog.open({
        template: 'bankSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveBank();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("updateBank()");

    };

    BankCtrl.prototype.deleteBank = function (bank) {
      this.$log.debug("deleteBank()");
      return this.BankService.deleteBank(bank).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete bank");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findBanks();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete bank: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    return BankCtrl;

  })();

  angular.module('sbAdminApp').controller('BankCtrl', BankCtrl);

}).call(this);

