(function () {
    'use strict';
	angular.module('lt.components.googleMaps', [])
		.directive('googleMap', function() {
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
				controller: 'GoogleMapCtrl',
				template: '<div class="angular-google-map" ng-class="class"></div>'
			};
		})
		.controller('GoogleMapCtrl', ['$scope', function($scope) {
			$scope.options = {
				zoom: 10,
				center: new google.maps.LatLng($scope.center.x, $scope.center.y),
                mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			$scope.init = function() {
				$scope.map = new google.maps.Map($scope.element, $scope.options);
			};

			$scope.$watch('coordinates', function(value) {
				var markers = [];
				var sum = { x: 0, y: 0 };

				if (value && value.length > 0) {
					$scope.markers = value.map(function(item) {
						var mk = new google.maps.Marker({
	                        position: stringToCoordinates(item),
	                        map: $scope.map,
	                        title: "title lt."
	                        // icon: that.frontPath + 'img/ico_court.png'
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
					$scope.map.setCenter( new google.maps.LatLng($scope.center[0], $scope.center[1]) );
					createMarkerClusterer($scope.map, $scope.markers);
				};
			});

			$scope.$watch('element', $scope.init);

			// TODO: avoid the undefined google var
			// $scope.google = google;
		}]);

	var stringToCoordinates = function(s) {
		console.log(s);
		var coordinates = s.split(',');
	    if (!coordinates) return null;
	    return new google.maps.LatLng(coordinates[0], coordinates[1]);
	};

	var createMarkerClusterer = function(map, markers) {
		// Marker clusterer
        var clusterStyles = [{
                textColor: 'white',
                height: 53,
                url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png",
                width: 53
            },
            {
                textColor: 'white',
                height: 66,
                url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m3.png",
                width: 66
            }, {
                textColor: 'white',
                height: 78,
                url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m4.png",
                width: 78
            }, {
                textColor: 'white',
                height: 90,
                url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m5.png",
                width: 90
            }
        ];

        // console.log(map);
        // console.log(markers);

        var mc = new MarkerClusterer(map, markers, {
            gridSize: 50,
            maxZoom: 15,
            styles: clusterStyles
        });
	};

		
})();