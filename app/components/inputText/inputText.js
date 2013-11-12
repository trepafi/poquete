(function () {
    'use strict';
	angular.module('lt.components.inputText', [])
		.directive('ltInputText', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					model: '=',
					label: '@',
					inputClass: '@',
					width: '@',
					icon: '@',
					placeholder: '@'
				},
				controller: 'InputCtrl',
				templateUrl: '/components/inputText/inputText.html'
			};
		})
		.controller('InputCtrl', ['$scope', function($scope) {
			
		}]);
})();