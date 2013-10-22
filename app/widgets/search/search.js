(function () {
    'use strict';
	angular.module('lt.widgets.search', ['lt.services.plansSvc'])
	    .directive('ltSearch', [ function () {
	            return {
	                restrict: 'E',
	                replace: true,
	                controller: 'SearchCtrl',
	                templateUrl: '/widgets/search/search.html'
	            };
	        }
	    ])
	    .controller('SearchCtrl', ['$scope', 'plansSvc', function($scope, plansSvc) {
	    	$scope.plans = [];
	    	$scope.total = 30;

	    	plansSvc.getAll().then(function(result) {
	    		console.log(result);
	    		$scope.plans = result;
	    	});

	    	
	    }]);
})();