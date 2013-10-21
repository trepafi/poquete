(function () {
    'use strict';
	angular.module('lt.components.inputText', [])
		.directive('inputText', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					width: '@',
					label: '@',
					icon: '@',
					class: '@',
					placeholder: '@'
				},
				controller: 'InputCtrl',
				templateUrl: '/components/inputText/inputText.html'
			};
		})
		.controller('InputCtrl', ['$scope', function($scope) {
			
		}]);
})();