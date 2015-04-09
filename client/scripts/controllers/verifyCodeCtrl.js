(function() {
    var VerifyCodeCtrl;

    VerifyCodeCtrl = (function() {
        function VerifyCodeCtrl($log, $modal, $scope, $http, $timeout, CustomerService) {
            this.$log = $log;
            this.$modal = $modal;
            this.$scope = $scope;
            this.$http = $http;
            this.$timeout = $timeout;
            this.CustomerService = CustomerService;
            this.$log.debug("constructing VerifyCodeCtrl");
            this.verifyCodes = [];
            this.today = new Date();
            this.pager = {};
            $scope.gridOptions = {
                data: 'pager.list',
                enablePaging: true,
                showFooter: true,
                multiSelect: false,
                i18n: "zh-cn",
                totalServerItems: 'pager.count',
                pagingOptions: {
                    pageSizes: [5, 10, 15],
                    pageSize: 10,
                    currentPage: 1
                },
                columnDefs: [
                    {
                        field: 'mobile',
                        displayName: '电话'
                    }, {
                        field: 'verifyCode',
                        displayName: '验证码'
                    }, {
                        field: 'verifyType',
                        displayName: '类型'
                    }, {
                        field: 'createdDatetime',
                        displayName: '创建时间',
                        cellFilter: "date:\"yyyy-MM-dd \""
                    }
                ]
            };
        }

        VerifyCodeCtrl.prototype.findVerifyCodes = function() {
            this.$log.debug("CustomerService findVerifyCodes");
            this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
            this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
            return this.CustomerService.findVerifyCodes(this.pager).then((function(_this) {
                return function(data) {
                    _this.$log.debug("Promise returned " + data.list.length + " Customers");
                    _this.verifyCodes = data.list;
                    return _this.$scope.pager = data;
                };
            })(this), (function(_this) {
                return function(error) {
                    _this.error = error;
                    return _this.$log.error("Unable to get Customers: " + error);
                };
            })(this));
        };

        return VerifyCodeCtrl;

    })();

    angular.module('sbAdminApp').controller('VerifyCodeCtrl', VerifyCodeCtrl);

}).call(this);

