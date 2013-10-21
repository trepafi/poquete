(function () {
    'use strict';
	angular.module('lt.components.pagination', [])
		.directive('pagination', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					total: '@',
					visible: '@'
				},
				controller: 'PaginationCtrl',
				templateUrl: '/components/pagination/pagination.html'
			};
		})
		.controller('PaginationCtrl', ['$scope', function($scope) {
				
		}]);
})();