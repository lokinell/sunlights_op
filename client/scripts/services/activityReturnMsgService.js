var ActivityReturnMsgService = function ($http, $q) {
    console.debug("constructing ActivityReturnMsgService");

    ActivityReturnMsgService.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    ActivityReturnMsgService.defaultConfig = {
        headers: ActivityReturnMsgService.headers
    };

    ActivityReturnMsgService.prototype.findResult = function (pager) {
        var deferred;
        console.debug("ActivityReturnMsgService()");
        deferred = $q.defer();
        $http.get(baseUrl + "/activityReturnMsg", {
            headers: {
                'params': encodeURIComponent(angular.toJson(pager))
            }
        }).success(function (data, status) {
            console.info("Successfully find ReturnMsgResult - status " + status);
            return deferred.resolve(data);
        }, function (data, status) {
            console.error("Failed to find ReturnMsgResult - status " + status);
            return deferred.reject(data);
        });
        return deferred.promise;
    };

    ActivityReturnMsgService.prototype.save = function (returnMsg) {
        var deferred;
        console.debug("ReconcileService()");
        deferred = $q.defer();
        $http.post(baseUrl + "/activityReturnMsg", returnMsg).success(function (data, status) {
            console.info("Successfully find ReconcileDetail - status " + data);
            return deferred.resolve(data);
        }, function (data, status) {
            console.error("Failed to find ReconcileDetail - status " + status);
            return deferred.reject(data);
        });
        return deferred.promise;
    };

    ActivityReturnMsgService.prototype.delete = function (returnMsg) {
        var deferred;
        console.debug("ReconcileService()");
        deferred = $q.defer();
        $http.delete(baseUrl + "/activityReturnMsg/" + returnMsg.id).success(function (data, status) {
            console.info("Successfully find /activityReturnMsg/delete - status " + data);
            return deferred.resolve(data);
        }, function (data, status) {
            console.error("Failed to find /activityReturnMsg/delete - status " + status);
            return deferred.reject(data);
        });
        return deferred.promise;
    };

    ActivityReturnMsgService.prototype.loadErrorMsg = function () {
        var deferred;
        console.debug("loadErrorMsg()");
        deferred = $q.defer();
        $http.get(baseUrl + "/errorMsg").success(function (data, status) {
            console.info("Successfully find loadErrorMsg - status " + status);
            return deferred.resolve(data);
        }, function (data, status) {
            console.error("Failed to find loadErrorMsg - status " + status);
            return deferred.reject(data);
        });
        return deferred.promise;
    };
};
angular.module('sbAdminApp').service('ActivityReturnMsgService', ActivityReturnMsgService);

