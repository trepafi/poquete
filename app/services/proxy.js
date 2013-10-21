(function () {
    'use strict';
    // reason: do backend calls in common way, hide difference between http and ws from service point of view
    angular.module('lt.services.proxy', ['lt.services.sockets', 'lt.services.http'])
        .factory('proxy', ['sockets', 'http', function (sockets, http) {
            return {
                sockets: sockets,
                http: http
            }
        }])
})();