/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('ResourceService', function () {
        var service, http;

        var resources = {"message": {"severity": 0, "code": "0000", "summary": "操作成功", "detail": "", "fields": {}}, "value": {"index": 0, "pageSize": 0, "pageNum": 0, "count": 28, "list": [
            {"name": "首页", "code": "home", "seqNo": "1", "parentId": 0, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "系统管理", "code": "system", "seqNo": "1", "parentId": 1, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "消息管理", "code": "message", "seqNo": "1", "parentId": 1, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "产品管理", "code": "product", "seqNo": "1", "parentId": 1, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "活动管理", "code": "activity", "seqNo": "1", "parentId": 1, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "权限管理", "code": "authority", "seqNo": "1", "parentId": 1, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "问题反馈", "code": "feedback", "seqNo": "1", "parentId": 1, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "银行管理", "code": "bank", "seqNo": "1", "parentId": 1, "type": "menu", "uri": null, "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "定时任务", "code": "system:job", "seqNo": "1", "parentId": 2, "type": "menu", "uri": "dashboard.tasks", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "基金公司", "code": "system:fund:company", "seqNo": "3", "parentId": 2, "type": "menu", "uri": "dashboard.fundcompanies", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "供应商", "code": "system:supplier", "seqNo": "4", "parentId": 2, "type": "menu", "uri": "dashboard.supplier", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "验证码", "code": "system:verifyCode", "seqNo": "6", "parentId": 2, "type": "menu", "uri": "dashboard.verifyCode", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "字典表", "code": "system:dict", "seqNo": "7", "parentId": 2, "type": "menu", "uri": "dashboard.dict", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "参数管理", "code": "system:dict", "seqNo": "7", "parentId": 2, "type": "menu", "uri": "dashboard.parameter", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "短信统计", "code": "message:sms", "seqNo": "1", "parentId": 3, "type": "menu", "uri": "dashboard.sms", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "群组管理", "code": "message:group", "seqNo": "2", "parentId": 3, "type": "menu", "uri": "dashboard.group", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "消息规则", "code": "message:role", "seqNo": "3", "parentId": 3, "type": "menu", "uri": "dashboard.messageRole", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "消息推送计划配置", "code": "message:config", "seqNo": "4", "parentId": 3, "type": "menu", "uri": "dashboard.messageConfig", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "规则与活动映射管理", "code": "message:mapping", "seqNo": "5", "parentId": 3, "type": "menu", "uri": "dashboard.messageMapping", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "产品信息", "code": "product:management", "seqNo": "1", "parentId": 4, "type": "menu", "uri": "dashboard.product", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "基金信息", "code": "product:fund", "seqNo": "2", "parentId": 4, "type": "menu", "uri": "dashboard.fund", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "反馈", "code": "feedback:index", "seqNo": "1", "parentId": 7, "type": "menu", "uri": "dashboard.feedback", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "问题", "code": "feedback:question", "seqNo": "2", "parentId": 7, "type": "menu", "uri": "dashboard.question", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "银行管理", "code": "bank:manage", "seqNo": "1", "parentId": 8, "type": "menu", "uri": "dashboard.bank", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "银行活期", "code": "bank:deposit", "seqNo": "2", "parentId": 8, "type": "menu", "uri": "dashboard.deposit", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "用户管理", "code": "authority:user", "seqNo": "1", "parentId": 6, "type": "menu", "uri": "dashboard.user", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "角色管理", "code": "authority:role", "seqNo": "2", "parentId": 6, "type": "menu", "uri": "dashboard.role", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false},
            {"name": "资源管理", "code": "authority:resource", "seqNo": "2", "parentId": 6, "type": "menu", "uri": "dashboard.resource", "createTime": 1422422629902, "updateTime": 1422422631476, "deleted": false}
        ], "filter": {}}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (ResourceService, $httpBackend) {
            service = ResourceService;
            http = $httpBackend;
        }));

        it('应该获取到资源列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/resources").respond(200, resources);

            service.findResources().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
