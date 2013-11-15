(function () {
    'use strict';
	angular.module('lt.components.googleMapsCreate', ['lt.components.googleMaps'])
		.directive('ltGoogleMap', function() {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					center: "=center", // required
					coordinates: "=coordinates", // optional
					latitude: "=latitude", // required
					longitude: "=longitude", // required
					zoom: "=zoom", // required
					events: "=events",
					class: "@class"
				},
				link: function(scope, element) {
					scope.element = element[0];
				},
				controller: 'GoogleMapCreateCtrl',
				template: '<div class="angular-google-map" ng-class="class"></div>'
			};
		})
		.controller('GoogleMapCreateCtrl', ['$scope', 'G', 'ltMaps', function($scope, G, maps) {
			$scope.markers = null;
			$scope.options = {
				zoom: 10,
				center: new G.maps.LatLng($scope.center.x, $scope.center.y),
                mapTypeId: G.maps.MapTypeId.ROADMAP
			};

			$scope.init = function() {
				$scope.map = new G.maps.Map($scope.element, $scope.options);
			};

			var cleanMarkers = function() {
				if($scope.markers != null) {
					$scope.markers.map(function(item) {
						item.setMap(null);
					});
					$scope.clusterer.clearMarkers();
				}
			};

			$scope.$watch('coordinates', function(value) {
				var markers = [];
				var sum = { x: 0, y: 0 };

				if (value && value.length > 0) {
					cleanMarkers();
					$scope.markers = value.map(function(item) {
						var mk = new G.maps.Marker({
	                        position: maps.stringToCoordinates(item),
	                        map: $scope.map,
	                        title: "title lt."
	                        // icon: {
	                        //     path: that.frontPath + 'img/tennis-court.ico',
	                        //     scale: 10
	                        // },	
	                    });
						var point = item.split(',');
						sum.x += parseFloat(point[0]);
						sum.y += parseFloat(point[1]);
						return mk;
					});

					$scope.center = [ sum.x / value.length, sum.y / value.length ];
					$scope.map.setCenter( new G.maps.LatLng($scope.center[0], $scope.center[1]) );
					$scope.clusterer = maps.createMarkerClusterer($scope.map, $scope.markers);
				};
			});

			$scope.$watch('element', $scope.init);

		}]);		
})();