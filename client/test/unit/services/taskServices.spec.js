/**
 * Created by Administrator on 2015/3/17.
 */
/* jshint undef:false*/
(function() {
  'use strict';

  describe('TaskService', function() {
    var rootScope;
    var service;
    var scope;
    beforeEach(module('sbAdminApp'));
    beforeEach(inject(function($rootScope, TaskService) {
       var task = {
          'jobClass': 'jobs.FundJob',
           'jobName': 'just a test',
           'jobStartTime': '2015-03-17T16:00:00.000Z',
           'seconds': '1',
          'hours': '0',
           'month': '*',
           'minutes': '*/20',
           'dayOfMonth': '4',
           'dayOfWeek': '三'
       };
      $rootScope.task = task;
      rootScope = $rootScope;
      scope = $rootScope.$new();
      service = TaskService;
    }));

    it('taskCtrl不会为空', function() {
      expect(service).not.toEqual(null);
    });



    it('taskCtrl获取任务列表返回状态码为0', function() {
      console.info(service.saveTask());

    });

  });
})();
