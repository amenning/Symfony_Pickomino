angular.module('pickominoGame')

.directive("tutorialBoard", function() {
	return {
		restrict: 'E',
		templateUrl: Routing.generate('angular_templates', { name: 'tutorial-board'})
	};
});	