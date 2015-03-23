/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('ProductService', function () {
        var service, http;

        var funds = {"message": {"severity": 0, "code": "0000", "summary": "操作成功", "detail": "", "fields": {}}, "value": {"index": 0, "pageSize": 0, "pageNum": 0, "count": 63, "list": [
            {"fundcode": "519511", "aliascode": "519511", "fundname": "万家14债", "fundnameabbr": "万家14天理财债券", "currDate": "2015-03-13", "fundType": 2, "investmentType": 6, "netvalue": 1, "totalNetvalue": 0, "percent": 0, "incomePerTenThousand": 1.2868, "percentSevenDays": 0.04438, "yield1M": 0.00331, "yield3M": 0.01124, "yield6M": 0.02213, "yield12M": null, "yieldThisYear": 0.00873, "cgs3Year": null, "lastestTotalAsset": 297489158.54, "onSale": 1, "riskLevel": "1", "shareType": "A", "purchaseState": 1, "subscribeState": 0, "aipState": 0, "recommendation": 0, "chargeRateValue": 0, "discount": 1, "saleChargeRateValue": 0, "isMonetary": 0, "isStf": 1, "purchaseLimitMin": 1E+2, "redeemLimitMin": 0.01, "rapidRedeem": 0, "iaGuid": "0485539f590c4fecb5c93c8ad2ea7e7f", "fundManagementFees": "0.33%", "fundTrusteeFees": "0.1%", "createTime": 1426495398608, "updateTime": 1426495398608, "companyName": "万家基金管理有限公司", "fundTypeFormat": "短期理财", "percentSevenDaysFormat": "4.43800%"},
            {"fundcode": "519508", "aliascode": "519508", "fundname": "万家货币", "fundnameabbr": "万家货币", "currDate": "2015-03-13", "fundType": 7, "investmentType": 4, "netvalue": 1, "totalNetvalue": 0, "percent": 0, "incomePerTenThousand": 1.1729, "percentSevenDays": 0.04488, "yield1M": 0.00343, "yield3M": 0.01094, "yield6M": 0.02272, "yield12M": 0.04431, "yieldThisYear": 0.00877, "cgs3Year": null, "lastestTotalAsset": 4344307685.13, "onSale": 1, "riskLevel": "0", "shareType": "A", "purchaseState": 1, "subscribeState": 0, "aipState": 1, "recommendation": 0, "chargeRateValue": 0, "discount": 1, "saleChargeRateValue": 0, "isMonetary": 1, "isStf": 0, "purchaseLimitMin": 1E+2, "redeemLimitMin": 0.01, "rapidRedeem": 0, "iaGuid": "0485539f590c4fecb5c93c8ad2ea7e7f", "fundManagementFees": "0.33%", "fundTrusteeFees": "0.10%", "createTime": 1426495398589, "updateTime": 1426495398589, "companyName": "万家基金管理有限公司", "fundTypeFormat": "货币型", "percentSevenDaysFormat": "4.48800%"}
        ], "filter": {}}};
        var managements = {"message": {"severity": 0, "code": "0000", "summary": "操作成功", "detail": "", "fields": {}}, "value": {"index": 0, "pageSize": 0, "pageNum": 0, "count": 63, "list": [
            {"id": 15904, "productCode": "000089", "productName": "民生家盈A", "productType": "FP.PRODUCT.TYPE.1", "productTypeValue": "基金", "productStatus": "FP.PRODUCT.MANAGE.STATUS.2", "productStatusValue": "下架", "beginDate": null, "endDate": null, "tempStopDate": null, "priorityLevel": null, "recommendType": "FP.RECOMMEND.TYPE.2", "recommendFlag": "FP.RECOMMEND.FLAG.2", "recommendDesc": null, "supplierCode": "GYS", "url": null, "isGrab": "Y", "isGrabDesc": "是", "upBeginTime": 1417449600000, "downEndTime": 1451664000000, "productDesc": null, "initBuyedCount": 218, "oneMonthBuyedCount": 343, "createTime": 1417835454439, "updateTime": 1426659828042, "createBy": null, "updateBy": null, "grabStatus": "FUND-GRAB-STATUS-OVERDUE", "grabStatusDesc": "过期", "fundCreateTime": 1426495398597},
            {"id": 15905, "productCode": "000322", "productName": "农银14债A", "productType": "FP.PRODUCT.TYPE.1", "productTypeValue": "基金", "productStatus": "FP.PRODUCT.MANAGE.STATUS.2", "productStatusValue": "下架", "beginDate": null, "endDate": null, "tempStopDate": null, "priorityLevel": null, "recommendType": "FP.RECOMMEND.TYPE.2", "recommendFlag": "FP.RECOMMEND.FLAG.2", "recommendDesc": null, "supplierCode": "GYS", "url": null, "isGrab": "Y", "isGrabDesc": "是", "upBeginTime": 1417392000000, "downEndTime": 1451606400000, "productDesc": null, "initBuyedCount": 330, "oneMonthBuyedCount": 332, "createTime": 1417835454439, "updateTime": 1426659453064, "createBy": null, "updateBy": null, "grabStatus": "FUND-GRAB-STATUS-OVERDUE", "grabStatusDesc": "过期", "fundCreateTime": 1426495398598},
            {"iid": 446620, "productCode": "001077", "productName": "华夏21债A", "productType": "FP.PRODUCT.TYPE.1", "productTypeValue": "基金", "productStatus": "FP.PRODUCT.MANAGE.STATUS.2", "productStatusValue": "下架", "beginDate": null, "endDate": null, "tempStopDate": null, "priorityLevel": null, "recommendType": "FP.RECOMMEND.TYPE.2", "recommendFlag": "FP.RECOMMEND.FLAG.2", "recommendDesc": null, "supplierCode": "GYS", "url": null, "isGrab": "Y", "isGrabDesc": "是", "upBeginTime": 1425139200000, "downEndTime": 1454256000000, "productDesc": null, "initBuyedCount": 564, "oneMonthBuyedCount": 356, "createTime": 1426235643192, "updateTime": 1426235643192, "createBy": null, "updateBy": null, "grabStatus": "FUND-GRAB-STATUS-OVERDUE", "grabStatusDesc": "过期", "fundCreateTime": 1426495398599}
        ], "filter": {}}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (ProductService, $httpBackend) {
            service = ProductService;
            http = $httpBackend;
        }));

        it('应该获取到基金列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/funds").respond(200, funds);

            service.findFunds().then(success).catch(fail).finally(done);

            http.flush();
        });

        it('应该获取到产品列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/managements").respond(200, managements);

            service.findProductManages().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
