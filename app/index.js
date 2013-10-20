(function () {
    'use strict';
    if (typeof window.poquete === 'undefined') {
        window['poquete'] = {};
    }

    angular.module('poquete', [])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {controller: 'mainCtrl', template:'<h1>Home</h1>'})
                .otherwise({redirectTo:'/'});

            // var routes = [
            //     [ '/yeah', { template: '<div>Yeah!</div>' }]
            // ];

            // routes.forEach(function (row) {
            //     $routeProvider.when(row[0], row[1]);
            // });

            // $routeProvider.otherwise({ redirectTo: '/' });
            // // $locationProvider.html5Mode(true);
            // // $locationProvider.hashPrefix('!');
        }])
        .controller('bodyCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {    
            console.log("Body controlller");
        }])
        .controller('mainCtrl', function() {
            console.log('Main');
        });
}());