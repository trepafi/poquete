(function () {
    'use strict';
	angular.module('lt.components.typeahead', [])
		.directive('ltTypeahead', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					model: '=',
					label: '@',
					inputClass: '@',
					items: '='
				},
				controller: 'TypeaheadCtrl',
				templateUrl: '/components/typeahead/typeahead.html'
			};
		})
		.controller('TypeaheadCtrl', ['$scope', function($scope) {
			
		}]);
})();