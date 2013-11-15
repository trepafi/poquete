(function () {
    'use strict';
	angular.module('lt.widgets.home', [])
	    .directive('ltHome', function () {
	            return {
	                restrict: 'E',
	                replace: true,
	                templateUrl: "/widgets/home/home.html"
	            };
	        }
	    );
})();