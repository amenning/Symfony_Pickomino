angular.module('pickominoGame')

.directive("gameSetup", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'game-setup'})
	};
});	