/**
 * Created by Yuan on 2015/3/23.
 */
(function () {
    'use strict';

    describe('DictCtrl', function () {
        var rootScope;
        var ctrl;
        var scope;
        var dict = {"id": 102, "codeCat": "FP.ACCOUNT.STATUS", "codeKey": "1", "codeVal": "正常", "createBy": "system", "createTime": 1411785022000, "status": "Y", "remarks": null, "magic": null, "seqNo": 1, "sysInd": "Y"};
        beforeEach(module('sbAdminApp'));
        beforeEach(inject(function ($rootScope, $controller) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            ctrl = $controller('DictCtrl', {
                $scope: scope
            });
        }));

        it('dictCtrl不为空', function () {
            expect(ctrl).not.toEqual(null);
        });

        it('dictCtrl获取任务列表', function () {
            ctrl.findDicts();
//            expect(ctrl.$scope.pager.list.length).toEqual(2);
//            expect(ctrl.$scope.pager.list[1]).toBe(dict);

        });

    });
})();
