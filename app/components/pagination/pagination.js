(function () {
    'use strict';
	angular.module('lt.components.pagination', [])
		.directive('ltPagination', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					pages: '='
				},
				controller: 'PaginationCtrl',
				templateUrl: '/components/pagination/pagination.html'
			};
		})
		.controller('PaginationCtrl', ['$scope', function($scope) {
			// TODO: Set a limit for visible items
			var updatePages = function() {
				var current = $scope.pages.current,
					total = $scope.pages.total,
					items = new Array(),
					previous = current - 1 < 1 ? 1 : current - 1,
					next = current + 1 > total ? total : current + 1;
			
				items.push({ 'number': 1, 'symbol': '«', 'active': false, 'disabled': false });
				items.push({ 'number': previous, 'symbol': '‹', 'active': false, 'disabled': false });

				for(var i = 1; i <= total; i++) {
					items.push( {
						'symbol': '',
						'number': i,
						'active': current == i,
						'disabled': false
					})
				}

				items.push({ 'number': next, 'symbol': '›', 'active': false, 'disabled': false });
				items.push({ 'number': total, 'symbol': '»', 'active': false, 'disabled': false });

				$scope.items = items;

				console.log('Pagination.js Update Pages');
				console.log($scope.pages);
				console.log(current);
				console.log($scope.items);
			};

			$scope.setPage = function (page) {
				$scope.pages.current = page;
				updatePages();
			};

			$scope.$watch('pages.total', function(value, oldValue) {
				$scope.setPage($scope.pages.current);
			});
			
		}]);
})();