(function(undefined){'use strict';
// Source: app/components/inputText/inputText.js
(function () {
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
}());