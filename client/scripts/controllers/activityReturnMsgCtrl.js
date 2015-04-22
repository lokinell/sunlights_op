var ActivityReturnMsgCtrl = function ($modal, $scope, $location,toaster, ActivityReturnMsgService,ActivityService, $rootScope, FileUploader,$http,$timeout) {

    // 每页条数 及条数可选项(默认为[10,20,30])
    //$scope.pageSizes = [3, 4, 5];
    // 不需要页面载入直接展示数据的设置为true,默认为展示
    //$scope.isNotInit = true;

    $scope.pager = {};


    $scope.constant = {
        activityTypes : [
            {key: '', value: '请选择'},
            {key: 'ATT001', value: '注册类'},
            {key: 'ATT002', value: '首次购买类'},
            {key: 'ATT003', value: '购买类'},
            {key: 'ATT004', value: '签到类'},
            {key: 'ATT005', value: '邀请类'},
            {key: '0', value: '取现'}
        ],
        rewardTypes : [

        ],
        scenes : [
            {key: '', value: '请选择'},
            {key: 'ASC001', value: '签到赚金豆'},
            {key: 'ASC002', value: '邀请好友场景'},
            {key: 'ASC004', value: '注册送金豆'},
            {key: 'ASC005', value: '首次购买'},
            {key: 'ASC006', value: '购买推荐场景'},
            {key: 'EXC001', value: '红包取现'}
        ],

        errorMsgs:[

        ],

        categories : [
            {key: '', value: '请选择'},
            {key: '1', value: '展示'},
            {key: '2', value: '发消息'},
            {key: '3', value: '奖励交易'}
        ]
    };

    $scope.gridOptions = {
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
            {field: 'sceneStr', displayName: '场景'},
            {field: 'activityTypeStr', displayName: '类型'},
            {field: 'rewardTypeStr', displayName: '奖励类型'},
            {field: 'categoryStr', displayName: '种类'},
            {field: 'errorMessage', displayName: '错误信息'},
            {field: 'template', displayName: '模版信息'},
            {field:'locked', displayName:'操作',cellTemplate:'views/cell/rewardTypeCell.html'}
        ]
    };

    $scope.alertFlag = false;

    $scope.editRow = function (row) {
        var modalInstance = $modal.open({
            templateUrl: "activityReturnMsgModalContent.html",
            controller: "ActivityReturnMsgModelInstance",
            resolve: {
                selectRow:function() {
                    return angular.toJson(row.entity);
                },
                itemConstant:function() {
                    return $scope.constant;
                }
            }
        });


    };

    $scope.deleteRow = function(row) {
        return ActivityReturnMsgService.delete(row.entity).then((function (data) {
            console.debug("Promise returned " + data.length + " banks");
            //$scope.myData = data;
            toaster.pop('success', "删除成功", "删除成功");
            $scope.findReturnMsg();

        }), function (error) {
            console.error("Unable to get activities: " + error.data);
            toaster.pop('success', "删除失败", "删除失败");
            $scope.error = error.data;
        });
    };

    $scope.removeAlert = function () {
        $scope.alertFlag = false;
    };

    $scope.findReturnMsg = function() {
        $scope.pager.pageSize = $scope.gridOptions.pagingOptions.pageSize;
        $scope.pager.pageNum = $scope.gridOptions.pagingOptions.currentPage;
        return ActivityReturnMsgService.findResult($scope.pager).then((function (data) {

            $scope.pager = data.value;

        }), function (error) {
            console.error("Unable to get activities: " + error.data);
            $scope.error = error.data;
        });
    };

    $scope.init = function() {
        $scope.initRewards();
        $scope.initErrorMsgs();
    };

    $scope.initRewards = function() {
        return ActivityService.loadRewardTypes().then((function (data) {
            console.debug("Promise returned " + data.length + " initRewards");
            $scope.constant.rewardTypes = data;

        }), function (error) {
            console.error("Unable to get activities: " + error.data);
            $scope.error = error.data;
        });


    };

    $scope.initErrorMsgs = function() {
        return ActivityReturnMsgService.loadErrorMsg().then((function (data) {
            console.debug("Promise returned " + data.length + " initErrorMsgs");
            $scope.constant.errorMsgs = data;

        }), function (error) {
            console.error("Unable to get initErrorMsgs: " + error.data);
            $scope.error = error.data;
        });

    };


    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: "activityReturnMsgModalContent.html",
            controller: "ActivityReturnMsgModelInstance",
            resolve: {
                selectRow:function() {
                    return {};
                },
                itemConstant:function() {
                    return $scope.constant;
                }
            }
        });


    };
};


angular.module('sbAdminApp').controller('ActivityReturnMsgCtrl', ActivityReturnMsgCtrl);
