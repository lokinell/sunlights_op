(function () {
  var QuestionCtrl;

  QuestionCtrl = (function () {
    function QuestionCtrl($scope, $rootScope, $log, $location, QuestionService, toaster) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$location = $location;
      this.QuestionService = QuestionService;
      this.toaster = toaster;
      this.$log.debug("constructing QuestionCtrl");
      this.questions = [];
      this.question = this.$rootScope.question || {};
      this.$rootScope.question = {};
      this.pager = {};
      this.status = [
        {
          key: '',
          value: '全部'
        },
        {
          key: 'N',
          value: '已处理'
        },
        {
          key: 'Y',
          value: '未处理'
        }
      ];
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
            field: "customerName",
            displayName: "客户姓名"
          }, {
            field: "phoneNo",
            displayName: "手机号"
          }, {
            field: "problem",
            displayName: "问题"
          }, {
            field: "remark",
            displayName: "备注"
          }, {
            field: "status",
            displayName: "是否处理",
            cellTemplate: "<div class='ngCellText' ng-class='col.colIndex()'><span>{{row.entity.status ==='Y' ? '是' : '否'}}</span></div>"
          }, {
            field: "createdTime",
            displayName: "创建时间"
          }, {
            field: "updateTime",
            displayName: "更新时间"
          }, {
            field: "createBy",
            displayName: "创建人"
          }, {
            field: "updateBy",
            displayName: "修改人"
          }, {
            field: null,
            displayName: "操作",
            cellTemplate: "views/question/operation.html"
          }
        ]
      };
    }

    QuestionCtrl.prototype.findQuestions = function () {
      this.$log.debug("findQuestions()");
      this.pager.pageSize = this.$scope.gridOptions.pagingOptions.pageSize;
      this.pager.pageNum = this.$scope.gridOptions.pagingOptions.currentPage;
      return this.QuestionService.findQuestions(this.pager).then((function (_this) {
        return function (data) {
          _this.$log.debug("Promise returned " + data.value.list.length + " Questions");
          return _this.$scope.pager = data.value;
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to get Questions: " + error);
          return _this.error = error;
        };
      })(this));
    };

    QuestionCtrl.prototype.saveQuestion = function () {
      this.$log.debug("saveQuestion()");
      return this.QuestionService.saveQuestion(this.question).then((function (_this) {
        return function (data) {
          _this.$log.debug("save question successfully");
          _this.toaster.pop('success', data.message.summary, data.message.detail);
          return _this.$location.path("/dashboard/question");
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to save question: " + error);
          _this.toaster.pop('error', error.message.summary, error.message.detail);
          return _this.error = error;
        };
      })(this));
    };

    QuestionCtrl.prototype.createQuestion = function () {
      this.$log.debug("createQuestion()");
      return this.$location.path("/dashboard/question/save");
    };

    QuestionCtrl.prototype.updateQuestion = function (question) {
      this.$log.debug("updateQuestion()");
      this.$rootScope.question = question;
      return this.$location.path("/dashboard/question/save");
    };

    QuestionCtrl.prototype.deleteQuestion = function (question) {
      this.$log.debug("deleteQuestion()");
      return this.QuestionService.deleteQuestion(question).then((function (_this) {
        return function (data) {
          _this.$log.debug("successfully delete question");
          return _this.findQuestions();
        };
      })(this), (function (_this) {
        return function (error) {
          _this.$log.error("Unable to delete question: " + error);
          return _this.error = error;
        };
      })(this));
    };

    return QuestionCtrl;

  })();

  angular.module('sbAdminApp').controller('QuestionCtrl', QuestionCtrl);

}).call(this);

