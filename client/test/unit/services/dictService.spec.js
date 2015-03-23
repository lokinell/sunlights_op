/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('DictService', function () {
        var service, http;

        var dicts = {"index": 0, "pageSize": 0, "pageNum": 0, "count": 181, "list": [
            {"id": 101, "codeCat": "FP.ACCOUNT", "codeKey": "STATUS", "codeVal": "账户状态", "createBy": "system", "createTime": 1411785022000, "status": "Y", "remarks": "2222", "magic": null, "seqNo": 0, "sysInd": "Y"},
            {"id": 102, "codeCat": "FP.ACCOUNT.STATUS", "codeKey": "1", "codeVal": "正常", "createBy": "system", "createTime": 1411785022000, "status": "Y", "remarks": null, "magic": null, "seqNo": 1, "sysInd": "Y"}
      ], "filter": {}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (DictService, $httpBackend) {
            service = DictService;
            http = $httpBackend;
        }));

        it('应该获取到字典表列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/dicts").respond(200, dicts);

            service.findDicts().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
