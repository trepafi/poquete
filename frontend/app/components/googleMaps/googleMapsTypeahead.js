(function () {
    'use strict';
	angular.module('lt.components.googleMapsTypeahead', [])
		.directive('ltGmTypeahead', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					model: '=',
					label: '@',
					inputClass: '@'
				},
				controller: 'GMTypeaheadCtrl',
				templateUrl: '/components/googleMaps/googleMapsTypeahead.html'
			};
		})
		.controller('GMTypeaheadCtrl', ['$scope', 'lodash', 'G', function($scope, _, G) {
			/* Typeahead */
			$scope.input = "";
			$scope.items = [];
			var geocoder = new G.maps.Geocoder();
			
			var getData = function(value) {
				$scope.items = [];
				geocoder.geocode({
                	'address': value + ' España'
                }, function(results, status) {
                	if (status == google.maps.DirectionsStatus.OK) {
	                	var res = [];
	                    for (var i in results) {
	                        res.push({
	                            label: results[i].formatted_address,
	                            value: results[i].formatted_address,
	                            location: results[i].geometry.location
	                        });
	                    }

	                    $scope.$apply(function() {
	                    	$scope.items = res;
	                    });
	                    
                	}
                });	
			};

			var debounced = _.debounce(getData, 500);

			$scope.$watch('input', function(value) {
				if(value.length > 3) {
					debounced(value);
				}

				if(value.length == 0) {
					$scope.model = "";
				}
			});

			$scope.select = function($item, $model, $label) {
				$scope.model = $item;
			};

		}]);
})();