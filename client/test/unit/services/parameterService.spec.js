/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('ParameterService', function () {
        var service, http;

        var parameters = {"message": {"severity": 0, "code": "0000", "summary": "操作成功", "detail": "", "fields": {}}, "value": {"index": 0, "pageSize": 0, "pageNum": 0, "count": 32, "list": [
            {"id": 8, "name": "CERTIFY_USERNAME", "value": "yyzc_admin", "description": "实名认证-帐号用户名", "status": "Y"},
            {"id": 9, "name": "USERUNLOCK_PERIOD", "value": "60", "description": "用户解锁时间(min)", "status": "Y"},
            {"id": 10, "name": "VERIFYCODE_TIMES", "value": "60", "description": "验证码最大次数的单位时间(min)", "status": "Y"},
            {"id": 11, "name": "CERTIFY_TEST", "value": "Y", "description": "实名认证-N真实调用/非N测试模式", "status": "Y"},
            {"id": 12, "name": "RELIEVE_SUSLOCK_PERIOD", "value": "30", "description": "暂时锁定的时间(min)", "status": "Y"},
            {"id": 13, "name": "COOKIE_EXPIRY", "value": "1440", "description": "cookie存在时间(min)", "status": "Y"},
            {"id": 14, "name": "SESSION_EXPIRY", "value": "1440", "description": "后台CustomerSession有效时间(min)，一般与COOKIE_EXPIRY存在时间一致", "status": "Y"},
            {"id": 15, "name": "SMS_URL", "value": "http://sms.2office.net:8080/WebService/sms3.aspx", "description": "短信接口-URL地址", "status": "Y"},
            {"id": 16, "name": "SMS_ACCOUNT", "value": "2523040", "description": "短信接口-第二办公室门牌号码", "status": "Y"},
            {"id": 18, "name": "SMS_CHANNEL", "value": "252304001", "description": "短信接口-通道编号", "status": "Y"},
            {"id": 19, "name": "SMS_WARRANTYCODE", "value": "9a15294089130ec6a8d27502d808a2a1", "description": "短信接口-授权码", "status": "Y"},
            {"id": 20, "name": "SMS_TEST", "value": "N", "description": "短信接口-N真实调用/非N 测试模式", "status": "Y"},
            {"id": 4, "name": "LOGIN_PERIOD", "value": "60", "description": "登录失败没到最大次数，隔XXX时间后失败次数清0的时间(min)", "status": "Y"},
            {"id": 7, "name": "VERIFYCODE_EXPIRY", "value": "10", "description": "验证码时效时间(min)", "status": "Y"},
            {"id": 32, "name": "APP_KEY", "value": "b5763dd71f67ef2da3e08fa2", "description": "极光推送app_key", "status": "Y"},
            {"id": 17, "name": "SMS_PASSWORD", "value": "yiyuezc597", "description": "短信接口-密码", "status": "Y"},
            {"id": 6, "name": "PWD_MAX", "value": "5", "description": "密码允许错误最大次数", "status": "Y"},
            {"id": 422461, "name": "CTCC", "value": "^1(33|53|8[09])\\d{8}$", "description": "电信号段", "status": "Y"},
            {"id": 422462, "name": "CUCC", "value": "^1(3[0-2]|45|5[56]|8[56])\\d{8}$", "description": "联通号段", "status": "Y"},
            {"id": 111, "name": "CMCC", "value": "^1(34[0-8]|(3[5-9]|47|5[0-2]|57[124]|5[89]|8[2378])\\d)\\d{7}$", "description": "移动号段", "status": "Y"},
            {"id": 33, "name": "SECRET_KEY", "value": "d5bc1fca3c38f30e212a5b85", "description": "极光推送secret_key", "status": "Y"},
            {"id": 34, "name": "ACTIVITY_SERVER", "value": "http://192.168.0.97", "description": "活动静态资源服务器", "status": "Y"},
            {"id": 35, "name": "ACTIVITY_SERVER_PORT", "value": "80", "description": "活动静态资源服务器端口", "status": "Y"},
            {"id": 36, "name": "ACTIVITY_IMAGE_PATH", "value": "/activity/images", "description": "活动静态资源服务器上活动图片的位置", "status": "Y"},
            {"id": 37, "name": "ACTIVITY_HTML5_PATH", "value": "/activity", "description": "活动静态资源服务器上活动html5的位置", "status": "Y"},
            {"id": 1, "name": "CERTIFY_URL", "value": "http://service.sfxxrz.com/IdentifierService.svc", "description": "实名认证-URL地址", "status": "Y"},
            {"id": 2, "name": "CERTIFY_PASSWORD", "value": "0DEi9dPb", "description": "实名认证-帐号密码1", "status": "Y"},
            {"id": 3, "name": "CACHE_EXPIRY", "value": "60", "description": "缓存存在时间(min)1", "status": "Y"},
            {"id": 38, "name": "ANDROID_LATEST_VERSION", "value": "1.4", "description": "安卓在应用商店里的最新版本", "status": "Y"},
            {"id": 446524, "name": "test", "value": "test", "description": "test", "status": "Y"},
            {"id": 5, "name": "VERIFYCODE_MAX", "value": "5", "description": "验证码在单位时间内最大次数1111", "status": "Y"},
            {"id": 422464, "name": "EXCHANGE_BEAN", "value": "1;2;5;100;200;500", "description": "金豆兑换话费可兑换的份额列表，每份之间用；隔开", "status": "Y"}
        ], "filter": {}}};

        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function (ParameterService, $httpBackend) {
            service = ParameterService;
            http = $httpBackend;
        }));

        it('应该获取到参数列表', function (done) {
            var success = function (data) {
                console.info(data);
            };

            var fail = function (error) {
                expect(error).toBeUndefined();
            };

            http.expectGET(baseUrl + "/parameters").respond(200, parameters);

            service.findParametersBy().then(success).catch(fail).finally(done);

            http.flush();
        });

    });
})();
