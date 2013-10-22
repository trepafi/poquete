(function () {
    'use strict';
	angular.module('lt.components.pagination', [])
		.directive('pagination', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					// items: '@',
					// size: '@',
					total: '@',
					visible: '@',
					current: '@'
				},
				controller: 'PaginationCtrl',
				templateUrl: '/components/pagination/pagination.html'
			};
		})
		.controller('PaginationCtrl', ['$scope', function($scope) {
			// TODO: Set a limit for visible items

			var calculatePages = function() {
				var current = parseInt($scope.current),
					pages = new Array(),
					previous = current - 1 < 1 ? 1 : current - 1,
					next = current + 1 > $scope.total ? $scope.total : current + 1;

				pages.push({ 'number': 1, 'symbol': '«', 'active': false, 'disabled': false });
				pages.push({ 'number': previous, 'symbol': '‹', 'active': false, 'disabled': false });

				for(var i = 1; i <= $scope.total; i++) {
					pages.push( {
						'symbol': '',
						'number': i,
						'active': current == i,
						'disabled': false
					})
				}

				pages.push({ 'number': next, 'symbol': '›', 'active': false, 'disabled': false });
				pages.push({ 'number': $scope.total, 'symbol': '»', 'active': false, 'disabled': false });

				$scope.pages = pages;
			};

			$scope.setPage = function (page) {
				$scope.current = page;
				calculatePages();
			};

			// $scope.total = Math.floor($scope.items / $scope.size) + ($scope.items % $scope.size == 0 ? 0 : 1);
			$scope.setPage($scope.current);

			
		}]);
})();