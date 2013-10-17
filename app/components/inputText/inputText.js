(function () {
    'use strict';
	angular.module('poquete.components.textField', [])
		.directive('textField', function() {
			return {
				restrict: 'E',
				replace: true,
				controller: 'inputCtrl',
				templateUrl: '/widgets/components/inputText/inputText.html'
			};
		})
})();