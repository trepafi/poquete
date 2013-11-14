(function () {
    'use strict';
	angular.module('lt.widgets.create', [])
	    .directive('ltCreate', [ function () {
	            return {
	                restrict: 'E',
	                replace: true,
	                templateUrl: "/widgets/create/create.html"
	            };
	        }
	    ]);
})();