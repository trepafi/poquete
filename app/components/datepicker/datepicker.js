(function () {
    'use strict';
	angular.module('lt.components.datepicker', [])
		.directive('ltDatepicker', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					model: '=',
					label: '@',
					inputClass: '@',
					labelClass: '@',
					odate: '='
				},
				controller: 'DatepickerCtrl',
				templateUrl: '/components/datepicker/datepicker.html'
			};
		})
		.controller('DatepickerCtrl', ['$scope', function($scope) {
		}]);
})();