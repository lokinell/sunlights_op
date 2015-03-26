/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('CustomerService', function () {
        var service, http;

        var customers = {"index": 0, "pageSize": 0, "pageNum": 0, "count": 98, "list": [
            {"id": 175360, "nickName": null, "userName": "冯伟", "passWord": "FA06CC983275B4E5696F8E741F768441", "mobilePhoneNo": "18201941698", "email": null, "idCardNo": "421182198807072175", "locked": false},
            {"id": 130460, "nickName": "PS", "userName": "熊涛", "passWord": "96E79218965EB72C92A549DD5A330112", "mobilePhoneNo": "15800731567", "email": null, "idCardNo": "420821198110223011", "locked": false},
            {"id": 240300, "nickName": null, "userName": "罗奎", "passWord": "96E79218965EB72C92A549DD5A330112", "mobilePhoneNo": "15121067568", "email": null, "idCardNo": "430481198104298590", "locked": false},
            {"id": 240301, "nickName": null, "userName": "承朝", "passWord": "96E79218965EB72C92A549DD5A330112", "mobilePhoneNo": "11111111112", "email": null, "idCardNo": "310108198507121553", "locked": false},
            {"id": 180562, "nickName": null, "userName": "张林", "passWord": "96E79218965EB72C92A549DD5A330112", "mobilePhoneNo": "15921904051", "email": null, "idCardNo": "321081198612161834", "locked": false},
            {"id": 18360, "nickName": null, "userName": "刘晓龙", "passWord": "96E79218965EB72C92A549DD5A330112", "mobilePhoneNo": "15800407237", "email": "null", "idCardNo": "610322199003094815", "locked": false},
            {"id": 424281, "nickName": null, "userName": "王佳明", "passWord": "3B63ACDC9E91869B0A822EC07148E80A", "mobilePhoneNo": "15821948594", "email": null, "idCardNo": "362531198912060033", "locked": false},
            {"id": 423306, "nickName": null, "userName": "李宁宁", "passWord": "96E79218965EB72C92A549DD5A330112", "mobilePhoneNo": "18321950423", "email": null, "idCardNo": "61032219890206392X", "locked": false},
        ], "filter": {}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (CustomerService, $httpBackend) {
            service = CustomerService;
            http = $httpBackend;
        }));

        it('应该获取到客户列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/customers").respond(200, customers);

            service.findCustomersBy().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
