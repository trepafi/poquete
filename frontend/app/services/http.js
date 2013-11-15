(function () {
    'use strict';
    angular.module('lt.services.http', [])
        .factory('http', ['$q', '$http', function ($q, $http) {
            return {
                get: function (url, options) {
                    var defer = $q.defer();

                    $http.get(url, options)
                        .success(function (data, status, headers, config) {
                            defer.resolve(data);
                        })
                        .error(function (data, status, headers, config) {
                            defer.reject(data);
                        });

                    return defer.promise;
                }
            }
        }])
})();