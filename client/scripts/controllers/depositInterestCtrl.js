(function () {
  var DepositInterestCtrl;

  DepositInterestCtrl = (function () {
    function DepositInterestCtrl($rootScope, $scope, $log, $location, toaster, ngDialog, DepositInterestService) {
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$log = $log;
      this.$location = $location;
      this.toaster = toaster;
      this.ngDialog = ngDialog;
      this.DepositInterestService = DepositInterestService;
      this.toaster = toaster;
      this.$log.debug("constructing DepositInterestCtrl");
      this.depositInterests = [];
      this.depositInterest = this.$scope.depositInterest || {};
      this.pager = {};
      this.dialog = {};
    }

    DepositInterestCtrl.prototype.findDepositInterests = function () {
      this.$log.debug("findDepositInterests()");
      return this.DepositInterestService.findDepositInterests(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.length + " DepositInterests");
          return _this.depositInterests = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get DepositInterests: " + error);
          return _this.error = error;
        };
      })(this));
    };

    DepositInterestCtrl.prototype.saveDepositInterest = function () {
      this.$log.debug("saveDepositInterest()");
      this.depositInterest = angular.copy(this.$scope.depositInterest);
      return this.DepositInterestService.saveDepositInterest(this.depositInterest).then((function (_this) {
        return function (data) {
          _this.findDepositInterests();
          _this.dialog.close();
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$log.debug("save depositInterest successfully");

        };
      })(this), (function (_this) {
        return function (error) {
          _this.$scope.error = error;
          return _this.$log.error("Unable to save depositInterest: " + error);

        };
      })(this));
    };

    DepositInterestCtrl.prototype.createDepositInterest = function () {
      this.$scope.error = null;
      this.$scope.depositInterest = {};
      this.dialog = this.ngDialog.open({
        template: 'depositSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveDepositInterest();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("createDepositInterest()");

    };

    DepositInterestCtrl.prototype.updateDepositInterest = function (depositInterest) {
      this.$scope.error = null;
      this.$scope.depositInterest = angular.copy(depositInterest);
      this.dialog = this.ngDialog.open({
        template: 'depositSaveDialog',
        className: 'ngdialog-theme-plain custom-width',
        scope: this.$scope,
        preCloseCallback: (function (_this) {
          return function (value) {
            _this.$log.debug("preCloseCallback()");
            if ('confirm' === value) {
              _this.saveDepositInterest();
              return false;
            } else {
              return true;
            }
          };
        })(this)
      });
      return this.$log.debug("updateDepositInterest()");
    };

    DepositInterestCtrl.prototype.deleteDepositInterest = function (depositInterest) {
      this.$log.debug("deleteDepositInterest()");
      return this.DepositInterestService.deleteDepositInterest(depositInterest).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete depositInterest");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.findDepositInterests();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete depositInterest: " + error);
          _this.toaster.pop('error', data.message.summary, data.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    return DepositInterestCtrl;

  })();

  angular.module('sbAdminApp').controller('DepositInterestCtrl', DepositInterestCtrl);

}).call(this);

