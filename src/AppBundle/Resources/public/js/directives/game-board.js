angular.module('pickominoGame')

.directive("gameBoard", function() {
	return {
		restrict: 'E',
		templateUrl: "/angular_directives/game-board"
	};
});	