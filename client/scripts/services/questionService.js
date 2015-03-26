(function () {
    var QuestionService;

    QuestionService = (function () {
        QuestionService.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        QuestionService.defaultConfig = {
            headers: QuestionService.headers
        };

        function QuestionService($log, $http, $q) {
            this.$log = $log;
            this.$http = $http;
            this.$q = $q;
            this.$log.debug("constructing QuestionService");
        }

        QuestionService.prototype.findQuestions = function (pager) {
            var deferred;
            this.$log.info("findQuestions " + (angular.toJson(pager, true)));
            deferred = this.$q.defer();
            this.$http.get(baseUrl + '/questions', {
                headers: {
                    'params': encodeURIComponent(angular.toJson(pager))
                }
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully find Questions - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to find Questions - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        QuestionService.prototype.saveQuestion = function (question) {
            var deferred;
            this.$log.debug("saveQuestion " + (angular.toJson(question, true)));
            deferred = this.$q.defer();
            this.$http.post(baseUrl + "/question", question).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully save Question - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to save Question - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        QuestionService.prototype.deleteQuestion = function (question) {
            var deferred;
            this.$log.debug("deleteQuestion " + (angular.toJson(question, true)));
            deferred = this.$q.defer();
            this.$http({
                method: 'DELETE',
                url: baseUrl + '/question',
                params: question
            }).success((function (_this) {
                return function (data, status, headers) {
                    _this.$log.info("Successfully update Question - status " + status);
                    return deferred.resolve(data);
                };
            })(this)).error((function (_this) {
                return function (data, status, headers) {
                    _this.$log.error("Failed to update Question - status " + status);
                    return deferred.reject(data);
                };
            })(this));
            return deferred.promise;
        };

        return QuestionService;

    })();

    angular.module('sbAdminApp').service('QuestionService', QuestionService);

}).call(this);

