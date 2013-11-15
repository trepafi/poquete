(function () {
    'use strict';

    // Assumes every dependency has already been loaded on the page
    angular.module('lt.components.factories', [])
        .factory('lodash', function () {
            return window._; 
        })
        .factory('G', function () {
            return window.google;
        })
        .factory('MC', function () {
            return window.MarkerClusterer;
        })
        ;
})();