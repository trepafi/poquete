(function () {
    'use strict';
	angular.module('lt.widgets.search', [])
	    .directive('ltSearch', [ function () {
	            return {
	                restrict: 'E',
	                replace: true,
	                controller: 'SearchCtrl',
	                templateUrl: '/widgets/search/search.html'
	            };
	        }
	    ])
	    .controller('SearchCtrl', ['$scope', function($scope) {
	    	$scope.plans = [];
	    	$scope.total = 30;
	    }]);
})();