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
	    	$scope.result = [];
	    	
	    	$scope.total = 0;
	    	$scope.size = 10;
	    	$scope.current = 1;
	    	$scope.start = 1;
	    	$scope.end = $scope.start + $scope.size;

	    	plansSvc.getAll().then(function(result) {
	    		$scope.plans = result;
	    		$scope.result = result;
	    		$scope.total = Math.floor($scope.plans.length / $scope.size) + ($scope.plans.length % $scope.size == 0 ? 0 : 1);
	    		// console.log($scope.plans.length);
	    	});

	    	var paginate = function(page) {
	    		var s = $scope.size;
	    		$scope.start = (page - 1) * s,
	    		$scope.end = $scope.start + s;
	    	};

	    	$scope.$watch('current', function(page) {
	    		paginate(page);
	    	})


	    }]);
})();