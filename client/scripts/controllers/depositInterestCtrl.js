(function () {
    var DepositInterestCtrl;

    DepositInterestCtrl = (function () {
        function DepositInterestCtrl($rootScope, $scope, $log, $location, DepositInterestService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$log = $log;
            this.$location = $location;
            this.DepositInterestService = DepositInterestService;
            this.$log.debug("constructing DepositInterestCtrl");
            this.depositInterests = [];
            this.depositInterest = this.$rootScope.depositInterest || {};
            this.$rootScope.depositInterest = {};
            this.pager = {};
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
            return this.DepositInterestService.saveDepositInterest(this.depositInterest).then((function (_this) {
                return function (data) {
                    _this.$log.debug("save depositInterest successfully");
                    return _this.$location.path("/dashboard/deposit");
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to save depositInterest: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        DepositInterestCtrl.prototype.createDepositInterest = function () {
            this.$log.debug("createDepositInterest()");
            return this.$location.path("/dashboard/deposit/save");
        };

        DepositInterestCtrl.prototype.updateDepositInterest = function (depositInterest) {
            this.$log.debug("updateDepositInterest()");
            this.depositInterest = depositInterest;
            this.$rootScope.depositInterest = this.depositInterest;
            return this.$location.path("/dashboard/deposit/save");
        };

        DepositInterestCtrl.prototype.deleteDepositInterest = function (depositInterest) {
            this.$log.debug("deleteDepositInterest()");
            return this.DepositInterestService.deleteDepositInterest(depositInterest).then((function (_this) {
                return function (data) {
                    _this.$log.debug("successfully delete depositInterest");
                    return _this.findDepositInterests();
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to delete depositInterest: " + error);
                    return _this.error = error;
                };
            })(this));
        };

        return DepositInterestCtrl;

    })();

    angular.module('sbAdminApp').controller('DepositInterestCtrl', DepositInterestCtrl);

}).call(this);

