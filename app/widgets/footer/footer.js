(function () {
    'use strict';
    angular.module('lt.widgets.footer', [])
        .directive('ltFooter', [ function () {
                return {
                    restrict: 'E',
                    replace: true,
                    controller: "FooterCtrl",
                    templateUrl: "/widgets/footer/footer.html"
                };
            }
        ]);
})();