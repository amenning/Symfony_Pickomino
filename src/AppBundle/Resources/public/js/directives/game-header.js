angular.module('pickominoGame')

.directive("gameHeader", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'game-header' })
	};
});