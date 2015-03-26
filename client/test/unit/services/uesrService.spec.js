/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('UserService', function () {
        var service, http;

        var users = {"message": {"severity": 0, "code": "0000", "summary": "操作成功", "detail": "", "fields": {}}, "value": {"index": 0, "pageSize": 0, "pageNum": 0, "count": 2, "list": [
            {"id": 1, "username": "admin", "password": "admin", "passwordConfirm": null, "status": "Y", "deleted": false, "createTime": 1422422137656, "updateTime": 1427080632760, "zhName": "", "pid": 453860, "lastName": null, "firstName": null, "email": "admin@sunlights.cc", "telephone": null, "menuVo": null, "roleIds": [1]}
        ], "filter": {}}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (UserService, $httpBackend) {
            service = UserService;
            http = $httpBackend;
        }));

        it('应该获取到用户列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/users").respond(200, users);

            service.findUsers().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
