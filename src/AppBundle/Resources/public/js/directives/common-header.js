angular.module('pickominoGame')

.directive("commonHeader", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'common-header' })
	};
});