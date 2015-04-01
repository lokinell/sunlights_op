var ActivityReturnMsgModelInstance = function ($modalInstance, $scope, $location, $rootScope,selectRow,itemConstant, $http,$timeout, ActivityReturnMsgService) {
    $scope.msg = angular.fromJson(selectRow);
    $scope.constant = itemConstant;

    $scope.ok = function() {
        ActivityReturnMsgService.save($scope.msg).then((function (data) {
            console.debug("Promise returned " + data.length + " banks");
            $scope.msg.id = data.id;

        }), function (error) {
            console.error("Unable to get activities: " + error.data);
            $scope.error = error.data;
        });
        $modalInstance.close($scope.msg);
        window.parent.location.reload();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
    };
};


angular.module('sbAdminApp').controller('ActivityReturnMsgModelInstance', ActivityReturnMsgModelInstance);
