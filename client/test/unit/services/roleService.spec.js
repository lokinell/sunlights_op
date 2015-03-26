/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('RoleService', function () {
        var service, http;

        var roles = {"message": {"severity": 0, "code": "0000", "summary": "操作成功", "detail": "", "fields": {}}, "value": {"index": 0, "pageSize": 0, "pageNum": 0, "count": 1, "list": [
            {"id": 1, "code": "system", "name": "管理员角色", "desc": "管理员角色", "createTime": 1422422427567, "updateTime": 1422422428573, "deleted": false, "resourceIds": []}
        ], "filter": {}}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (RoleService, $httpBackend) {
            service = RoleService;
            http = $httpBackend;
        }));

        it('应该获取到角色列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/roles").respond(200, roles);

            service.findRoles().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
