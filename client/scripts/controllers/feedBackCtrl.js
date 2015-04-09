(function () {
  var FeedBackCtrl;

  FeedBackCtrl = (function () {
    function FeedBackCtrl($scope, $rootScope, $log, $location, FeedBackService, toaster) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.FeedBackService = FeedBackService;
      this.toaster = toaster;
      this.$log.debug("constructing FeedBackCtrl");
      this.feedBacks = [];
      this.feedBack = this.$rootScope.feedBack || {};
      this.status = [
        {
          key: 'Y',
          value: '已处理'
        },
        {
          key: 'N',
          value: '未处理'
        },
        {
          key: '',
          value: '全部'
        }
      ];
      this.pager = {
        filter: {
          EQS_status: ''
        }
      };
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
            field: 'deviceNo',
            displayName: '设备号'
          },
          {
            field: 'customerId',
            displayName: '客户编码'
          },
          {
            field: 'context',
            displayName: '反馈内容'
          },
          {
            field: 'mobile',
            displayName: '手机号'
          },
          {
            field: 'createTime',
            displayName: '创建时间',
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          },
          {
            field: 'updateTime',
            displayName: '修改时间',
            cellFilter: 'date:"yyyy-MM-dd HH:mm"'
          },
          {
            field: 'updateBy',
            displayName: '处理人'
          },
          {
            field: "remark",
            displayName: '备注'
          },
          {
            field: "status",
            displayName: '状态'
          },
          {
            field: null,
            displayName: '审核',
            cellTemplate: 'views/feedback/operation.html'
          }
        ]
      };
    }

    FeedBackCtrl.prototype.findFeedBacks = function () {
      this.$log.debug("findFeedBacks");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.FeedBackService.findFeedBacks(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.list.length + " FeedBacks");
          return _this.$scope.pager = data;
        };
      })(this), (function (_this) {
        return function (error) {
          return _this.$log.error("Unable to get FeedBacks: " + error);
        };
      })(this));
    };

    FeedBackCtrl.prototype.toApproveFeedBack = function (feedBack) {
      this.$log.debug("toApproveFeedBack()");
      this.$rootScope.feedBack = feedBack;
      return this.$location.path("/dashboard/feedback/approve");
    };

    FeedBackCtrl.prototype.approveFeedBack = function () {
      this.$log.debug("approveFeedBack()");
      return this.FeedBackService.approveFeedBack(this.feedBack).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully approveFeedBack");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$location.path("/dashboard/feedback");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.$log.error("Unable to get ProductRecommends: " + error);
        };
      })(this));
    };

    FeedBackCtrl.prototype.deleteFeedBack = function () {
      this.$log.debug("deleteFeedBack()");
      return this.FeedBackService.deleteFeedBack(this.feedBack).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully deleteFeedBack");
          return _this.findFeedBacks();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete FeedBack: " + (angular.toJson(error, true)));
          return _this.error = error;
        };
      })(this));
    };

    return FeedBackCtrl;

  })();

  angular.module('sbAdminApp').controller('FeedBackCtrl', FeedBackCtrl);

}).call(this);

