(function () {
    'use strict';
	angular.module('lt.widgets.search', ['lt.services.plansSvc', 'ui.bootstrap'])
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
	    	
	    	$scope.pages = {
	    		total: 0,
	    		current: 1,
	    		size: 10,
	    		start: 0,
	    		end: 0,
	    		visible: 5
	    	};
	    	$scope.pages.end = $scope.pages.start + $scope.pages.size

	    	$scope.data = {
	    		what: "",
	    		when: "",
	    		where: ""
	    	};

	    	$scope.pagination = {
	    		total: 40,
	    		current: 2
	    	};

	    	var calculatePages = function() {
	    		// $scope.pages.total = Math.floor($scope.result.length / $scope.pages.size) + ($scope.result.length % $scope.pages.size == 0 ? 0 : 1)
	    		$scope.pages.total = $scope.result.length;
	    		$scope.pages.current = 1;
	    	};

	    	var setPage = function(page) {
	    		var s = $scope.pages.size;
	    		$scope.pages.start = (page - 1) * s,
	    		$scope.pages.end = $scope.pages.start + s;
	    	};

	    	$scope.filter = function() {
	    		console.log('Filtering');
	    		var result = [];
	    		result = $scope.plans.filter(function(item) {
	    			var what = $scope.data.what.toLowerCase(),
	    				when = $scope.data.when,
	    				add = [];
	    			// For what
	    			if(what == '' || what.length < 3) {
	    				add.push(true);
	    			}
	    			else {
	    				add.push(item.title.toLowerCase().indexOf(what) != -1);
	    			}

	    			if(when == '') {
	    				add.push(true);
	    			}
	    			else {
	    				add.push(item.date == when);
	    			}

	    			var res = true;
	    			add.forEach(function(item) {
	    				console.log(item);
	    				res &= item;
	    			});

	    			console.log(res);
	    			return res; 
	    		});
	    		
	    		$scope.result = result;
	    		calculatePages();
	    	};

	    	plansSvc.getAll().then(function(result) {
	    		$scope.plans = result;
	    		$scope.result = result;
	    		calculatePages();
	    	});

	    	$scope.$watch('pages.current', function(value, oldValue) {
	    		if(value !== oldValue) {
	    			setPage(value);
	    		}
	    	});

	    	$scope.$watch('data.what', function(value, oldValue) {
	    		if(value !== oldValue) {
	    			$scope.filter();
	    		}
	    	});

	    	$scope.$watch('data.when', function(value, oldValue) {
	    		if(value !== oldValue) {
	    			$scope.filter();
	    		}
	    	});


	    }]);
})();