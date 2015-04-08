/**
 * Created by Yuan on 2015/3/17.
 */
(function () {
  var BankCtrl;

  BankCtrl = (function () {
    function BankCtrl($scope, $rootScope, $log, $location, BankService, toaster) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.BankService = BankService;
      this.toaster = toaster;
      this.$log.debug("constructing BankCtrl");
      this.banks = [];
      this.bank = this.$rootScope.bank || {};
      this.$rootScope.bank = {};
      this.pager = {};
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
      return this.BankService.saveBank(this.bank).then((function (_this) {
        return function (data) {
          _this.$log.debug("save bank successfully");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$location.path("/dashboard/bank");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to save bank: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    BankCtrl.prototype.createBank = function () {
      this.$log.debug("createBank()");
      return this.$location.path("/dashboard/bank/save");
    };

    BankCtrl.prototype.updateBank = function (bank) {
      this.$log.debug("updateBank()");
      this.$rootScope.bank = bank;
      return this.$location.path("/dashboard/bank/save");
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

