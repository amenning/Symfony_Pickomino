angular.module('pickominoGame')

.directive("gameRegistration", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'game-registration'})
	};
});	