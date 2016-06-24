angular.module('pickominoGame')			
		
.factory("StealWormAction", [
    'GameAction',
    'CheckValidWormSteal',
    'GrillWormsArray',
    'PlayerWormsArray',
    'PlayerNotification',
    'RandomDice',
    'GameState',
    function StealWormActionFactory(GameAction, CheckValidWormSteal, GrillWormsArray, PlayerWormsArray, PlayerNotification, RandomDice, GameState){
		return {
			steal: function(wormValue, fromPlayer, index){				
				if(GameAction.status.takeWorm===true && fromPlayer!==GameAction.status.activePlayer){
					if(CheckValidWormSteal.validate(wormValue)  && index===0){
						PlayerWormsArray.removeStolenWorm(wormValue);
						PlayerWormsArray.addWorm(wormValue);
						GrillWormsArray.removeWormHighlight();
						GameAction.setStatus('takeWorm', false);
						GameAction.setStatus('freezeDice', false);
						RandomDice.resetDice();
						GameAction.setStatus('roll', true);
						GameAction.switchPlayer();
						PlayerNotification.setMessage('Please roll the dice.');
						GameState.save();
					}else{
						PlayerNotification.setMessage('You cannot take that worm tile.');
					}
				}
			}
		};
}]);