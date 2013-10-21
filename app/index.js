(function () {
    'use strict';
    if (typeof window.lt === 'undefined') {
        window['lt'] = {};
    }

    angular.module('lt', ['ngRoute', 'lt.widgets', 'lt.components', 'lt.services'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            var routes = [
                
            ];

            routes.forEach(function (row) {
                $routeProvider.when(row[0], row[1]);
            });

            $routeProvider.otherwise({ redirectTo: '/' });
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }])
        .controller('bodyCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {    
            console.log("Body controlller");
        }])
        .controller('mainCtrl', function() {
            console.log('Main');
        })
        // .directive('tabsAbc', function() {
        //     return {
        //         restrict: 'E',
        //         transclude: true,
        //         scope: {},
        //         template: "<div>TABS</div>"
        //     };
        // })
        ;

}());