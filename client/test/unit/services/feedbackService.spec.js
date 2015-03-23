/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('FeedBackService', function () {
        var service, http;

        var feedbacks = {"index": 0, "pageSize": 0, "pageNum": 0, "count": 49, "list": [
            {"id": 422540, "customerId": "20150123161019010000000108", "context": "2258", "mobile": "15800407237", "remark": null, "status": "N", "deviceNo": "B2280064-6B56-4875-B2F7-AD23D6EF62D1", "createTime": 1422001836783, "updateTime": 1422001836783, "updateBy": null},
            {"id": 341181, "customerId": "20150112092413010000000074", "context": "a a a a", "mobile": "18321950423", "remark": null, "status": "N", "deviceNo": "0E5F398E-C812-47C4-BB28-22E1226BFF11", "createTime": 1421048385475, "updateTime": 1421048385475, "updateBy": null},
            {"id": 341180, "customerId": "20150112092413010000000074", "context": "a a a a", "mobile": "18321950423", "remark": null, "status": "N", "deviceNo": "0E5F398E-C812-47C4-BB28-22E1226BFF11", "createTime": 1421043763556, "updateTime": 1421043763556, "updateBy": null},
            {"id": 240980, "customerId": "20150105152832010000000068", "context": "系统bug", "mobile": "15121067568", "remark": null, "status": "Y", "deviceNo": "0E5F398E-C812-47C4-BB28-22E1226BFF11", "createTime": 1420445202363, "updateTime": 1420445244780, "updateBy": null},
            {"id": 180460, "customerId": "20141206105029010000000040", "context": "U", "mobile": "15800731567", "remark": null, "status": "N", "deviceNo": "599D2722-5D7C-4BC3-A6C5-BE39D5661D6F", "createTime": 1419931590032, "updateTime": 1419931590032, "updateBy": null},
            {"id": 130140, "customerId": "20141028113722010000000011", "context": "Qq", "mobile": "18501676712", "remark": null, "status": "N", "deviceNo": "06D3B907-66AA-4318-9684-B3F071B80089", "createTime": 1417783023157, "updateTime": 1417783023157, "updateBy": null},
            {"id": 5410, "customerrId": "20141028153845010000000017", "context": "decicels", "mobile": "15821948594", "remark": null, "status": null, "deviceNo": null, "createTime": 1415172988011, "updateTime": 1415172988011, "updateBy": null}
        ], "filter": {}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (FeedBackService, $httpBackend) {
            service = FeedBackService;
            http = $httpBackend;
        }));

        it('应该获取到银行活期列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/feedbacks").respond(200, feedbacks);

            service.findFeedBacks().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
