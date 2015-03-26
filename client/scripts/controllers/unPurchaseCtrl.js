/**
 * Created by Yuan on 2015/3/26.
 */
(function () {
    var UnPurchaseCtrl;

    UnPurchaseCtrl = (function () {
        function UnPurchaseCtrl($scope, $log, PurchaseStatisticsService) {
            this.$scope = $scope;
            this.$log = $log;
            this.PurchaseStatisticsService = PurchaseStatisticsService;
            this.$log.debug("constructing UnPurchaseCtrl");
            this.pager = {};
            this.exportPager = {};
            this.exportUrl = baseUrl + "/statistics/unpurchase/excel";
            $scope.unPurchaseOptions = {
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
                        field: "registrationDate",
                        displayName: "注册日期",
                        cellFilter: 'date:"yyyy-MM-dd HH:mm"'
                    },
                    {
                        field: "mobile",
                        displayName: "注册手机号"
                    },
                    {
                        field: "name",
                        displayName: "注册未购买人姓名"
                    },
                    {
                        field: "referrerMobile",
                        displayName: "推荐人手机号"
                    },
                    {
                        field: "referrerName",
                        displayName: "推荐人"
                    }
                ]
            };

        }

        UnPurchaseCtrl.prototype.findUnPurchases = function () {
            this.$log.debug("findUnPurchases()");
            this.pager.pageSize = this.$scope.unPurchaseOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.unPurchaseOptions.pagingOptions.currentPage;
            this.PurchaseStatisticsService.findUnPurchases(this.pager).then((function (_this) {
                return function (data) {
                    _this.$log.debug("Promise returned " + data.value.list.length + " UnPurchases");
                    return _this.$scope.pager = data.value;
                };
            })(this), (function (_this) {
                return function (error) {
                    _this.$log.error("Unable to get UnPurchases: " + error);
                    return _this.error = error;
                };
            })(this));
            return this.exportPager = this.pager;
        };

        return UnPurchaseCtrl;

    })();

    angular.module('sbAdminApp').controller('UnPurchaseCtrl', UnPurchaseCtrl);

}).call(this);

