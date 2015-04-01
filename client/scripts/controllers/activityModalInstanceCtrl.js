(function() {
  var ActivityModalInstanceCtrl;

  ActivityModalInstanceCtrl = (function() {
    function ActivityModalInstanceCtrl($modal, $scope, $log, $location, modalInstance, uploaderImage, uploaderHtml5, selectedRow, ActivityService, constant) {
      this.$modal = $modal;
      this.$scope = $scope;
      this.$log = $log;
      this.$location = $location;
      this.modalInstance = modalInstance;
      this.uploaderImage = uploaderImage;
      this.uploaderHtml5 = uploaderHtml5;
      this.selectedRow = selectedRow;
      this.ActivityService = ActivityService;
      this.constant = constant;
      this.$log.debug("constructing ActivityCtrl");
      this.$scope.row = angular.fromJson(selectedRow);
      this.$scope.constant = angular.fromJson(constant);
      this.$scope.uploaderImage = uploaderImage;
      this.$scope.uploaderHtml5 = uploaderHtml5;
      this.$scope.ok = function() {
        ActivityService.saveActivity($scope.row);
        modalInstance.close($scope.row);
        return window.parent.location.reload();
      };
      this.$scope.cancel = function() {
        return modalInstance.dismiss("cancel");
      };
    }

    return ActivityModalInstanceCtrl;

  })();

  angular.module('sbAdminApp').controller('activityModalInstanceCtrl', ActivityModalInstanceCtrl);

}).call(this);


