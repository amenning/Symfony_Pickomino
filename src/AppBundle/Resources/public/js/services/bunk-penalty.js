angular.module('pickominoGame')

.factory("BunkPenalty", [
	'PlayerWormsArray',
	'GameAction',
	'GrillWormsArray',
	'RandomDice',
	'PlayerNotification',
	'GameState',
	function BunkPenaltyFactory(PlayerWormsArray, GameAction, GrillWormsArray, RandomDice, PlayerNotification, GameState){
		return {
			penalize: function(){
				if(PlayerWormsArray.array[GameAction.status.activePlayer].length!==0){
					//return worm to grill
					wormValue = PlayerWormsArray.removeBunkWorm();
					//remove highest value worm from grill
					GrillWormsArray.addWorm(wormValue);
					GrillWormsArray.removeBunkWorm(wormValue);
				}
				//reset dice and start over
				RandomDice.resetDice();
				GameAction.setStatus('roll', true);
				GameAction.setStatus('takeWorm', false);
				GameAction.setStatus('freezeDice', false);
				GameAction.setStatus('bunk', false);
				GameAction.switchPlayer();
				PlayerNotification.setMessage('You can now reroll the dice.');
				GameState.save();
			}
		};
}]);
