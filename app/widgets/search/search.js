(function () {
    'use strict';
	angular.module('lt.widgets.search', ['ui.bootstrap', 'lt.services.plansSvc'])
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

	    	$scope.totalItems = 64;
			$scope.currentPage = 4;
			$scope.maxSize = 5;

			$scope.setPage = function (pageNo) {
				$scope.currentPage = pageNo;
			};

			$scope.bigTotalItems = 175;
			$scope.bigCurrentPage = 1;
	    }]);
})();