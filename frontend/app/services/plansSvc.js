(function () {
    'use strict';
    angular.module('lt.services.plansSvc', ['lt.services.proxy'])
        .factory('plansSvc', ['$q', '$http', 'proxy', function ($q, $http, proxy) {
            return {
                getAll: function () {
                    var defer = $q.defer();

                    $http.get('/mocks/plans.json')
                        .success(function (data, status, headers, config) {
                            defer.resolve(data);
                        })
                        .error(function (data, status, headers, config) {
                            defer.reject(data);
                        });

                    return defer.promise;
                }
            }
        }]);
})();