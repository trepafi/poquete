(function () {
    'use strict';
    // Assumes every dependency has already been loaded on the page
    angular.module('lt.components.googleMaps', ['lt.components.factories'])       
        .factory('ltMaps', ['G', 'MC', function(G, MC) {
            return {
        		stringToCoordinates: function(s) {
                    var coordinates = s.split(',');
                    if (!coordinates) return null;
                    return new G.maps.LatLng(coordinates[0], coordinates[1]);
                },
                createMarkerClusterer: function(map, markers) {
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

                    var mc = new MC(map, markers, {
                        gridSize: 50,
                        maxZoom: 15,
                        styles: clusterStyles
                    });

                    return mc;
                }
        	}
        }]);  
})();