(function() {
  var CompanyCtrl;

  CompanyCtrl = (function() {
    function CompanyCtrl($scope, $rootScope, $log, $location, CompanyService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.CompanyService = CompanyService;
      this.$log.debug("constructing CompanyCtrl");
      this.companies = [];
      this.company = this.$rootScope.company || {};
      this.$rootScope.company = {};
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
            field: 'abbrName',
            displayName: '简称'
          }, {
            field: 'pinYinCode',
            displayName: '拼音代码'
          }, {
            field: 'contactAddr',
            displayName: '联系地址'
          }, {
            field: 'webSite',
            displayName: '直营网站'
          }, {
            field: 'email',
            displayName: '电子邮件'
          }, {
            field: 'establishmentDate',
            displayName: '成立日期'
          }, {
            field: 'fax',
            displayName: '传真'
          }
        ]
      };
    }

    CompanyCtrl.prototype.findCompanies = function() {
      this.$log.debug("findCompanies()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.CompanyService.findCompanies(this.pager).then((function(_this) {
        return function(data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Companies");
          return _this.$scope.pager = data.value;
        };
      })(this), (function(_this) {
        return function(error) {
          _this.$log.error("Unable to get Companies: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return CompanyCtrl;

  })();

  angular.module('sbAdminApp').controller('CompanyCtrl', CompanyCtrl);

}).call(this);

