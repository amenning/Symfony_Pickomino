angular.module('pickominoGame')			
		
.factory("TakeWormAction", [
    'GameAction',
    'CheckValidWormTake',
    'GrillWormsArray',
    'PlayerWormsArray',
    'PlayerNotification',
    'RandomDice',
    'GameState',
    function TakeWormActionFactory(GameAction, CheckValidWormTake, GrillWormsArray, PlayerWormsArray, PlayerNotification, RandomDice, GameState){
		return {
			take: function(wormValue){				
				if(GameAction.status.takeWorm===true){
					if(CheckValidWormTake.validate(wormValue)){
						GrillWormsArray.removeWorm(wormValue);
						PlayerWormsArray.addWorm(wormValue);
						GrillWormsArray.removeWormHighlight();
						GameAction.setStatus('takeWorm', false);
						GameAction.setStatus('freezeDice', false);
						if(GrillWormsArray.array.length === 0){
							GameAction.setStatus('gameOver', true);
							GameAction.setStatus('roll', false);
							PlayerNotification.setMessage('Game Over!');
							GameState.save();
						}else{
							RandomDice.resetDice();
							GameAction.setStatus('roll', true);
							GameAction.switchPlayer();
							PlayerNotification.setMessage('Please roll the dice.');
							GameState.save();
						}
					}else{
						PlayerNotification.setMessage('You cannot take that worm tile.');
					}
				}else if(GameAction.status.roll===true){
					PlayerNotification.setMessage('You need to reroll the dice.');
				}
			}
		};
}]);