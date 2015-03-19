/**
 * Created by Administrator on 2015/3/17.
 */
/* jshint undef:false*/
(function() {
  'use strict';

  describe('TaskService', function() {
    var service, http;

    var expectedTasks = {

    };

    beforeEach(module('sbAdminApp'));
    beforeEach(inject(function(TaskService, $httpBackend) {
      service = TaskService;
      http = $httpBackend;
    }));

    it('应该获取到任务列表', function(done) {
      var success = function(data){
        console.info(data);
      };

      var fail = function(error){
        expect(error).toBeUndefined();
      };

      http.expectGET(baseUrl+"/tasks").respond(200, expectedTasks);

      service.listTasks().then(success).catch(fail).finally(done);

      http.flush();
    });

  });
})();
