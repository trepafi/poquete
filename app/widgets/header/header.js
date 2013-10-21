(function () {
    'use strict';
	angular.module('lt.widgets.header', [])
	    .directive('ltHeader', [ function () {
	            return {
	                restrict: 'E',
	                replace: true,
	                templateUrl: "/widgets/header/header.html"
	            };
	        }
	    ]);
})();