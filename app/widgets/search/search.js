(function () {
    'use strict';
	angular.module('lt.widgets.search', ['ui.bootstrap', 'lt.services.plansSvc', 'lt.utils.filters'])
	    .directive('ltSearch', [ function () {
	            return {
	                restrict: 'E',
	                replace: true,
	                controller: 'SearchCtrl',
	                templateUrl: '/widgets/search/search.html'
	            };
	        }
	    ])
	    .controller('SearchCtrl', ['$scope', '$timeout', 'plansSvc', function($scope, $timeout, plansSvc) {
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

	    	/* Pagination */
	    	$scope.pagination = {
	    		total: 40,
	    		current: 2
	    	};

	    	var calculatePages = function() {
	    		$scope.pages.total = $scope.result.length;
	    		$scope.pages.current = 1;
	    	};

	    	var setPage = function(page) {
	    		var s = $scope.pages.size;
	    		$scope.pages.start = (page - 1) * s,
	    		$scope.pages.end = $scope.pages.start + s;
	    	};

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

	    	/* Getting data */
	    	plansSvc.getAll().then(function(result) {
	    		$scope.plans = result;
	    		$scope.result = result;
	    		calculatePages();
	    		getMarkers();
	    	});

	    	/* Filtering data */
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

	    			// For when
	    			if(when == null) {
	    				add.push(true);
	    			}
	    			else {
	    				var dt = item.date.split('/');
	    				dt = new Date(dt[2], dt[1] - 1, dt[0]).getTime();
	    				add.push(dt === when.getTime());
	    			}

	    			// Evaluating response
	    			var res = true;
	    			add.forEach(function(item) {
	    				// console.log(item);
	    				res &= item;
	    			});

	    			// console.log(res);
	    			return res; 
	    		});
	    		
	    		$scope.result = result;
	    		calculatePages();
	    	};

	    	/* Date object */
	    	$scope.odate = {
				showWeeks: false,
				minDate: new Date(), 
				opened: false,
				options: {
					yearFormat: "'yy'",
					startingDay: 1
				}
			}

			$scope.odate.open = function() {
				$timeout(function() {
					$scope.odate.opened = true;
				});
			};

			/* Maps */
			$scope.map = {
				id: 'search-map',
				markers: [],
				center: {
					x: 0,
					y: 0
				}
			}

			var getMarkers = function() {
				$scope.map.markers = $scope.result.map(function(item) {
					return item.coordinates;
				});
			};


	    }]);
})();