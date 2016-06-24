angular.module('pickominoGame')

.factory("RollDice",[ 
		'GameAction',
		'RandomDice',
		'GrillWormsArray',
		'PlayerNotification',
		'GameState',
		function RollDiceFactcory(GameAction, RandomDice, GrillWormsArray, PlayerNotification, GameState){
			return {
				roll: function (){
					if(GameAction.status.roll===true){
						GrillWormsArray.removeWormHighlight();
						RandomDice.roll();
						GameAction.checkMoveAvailable();				
						if(!GameAction.status.bunk){
							PlayerNotification.setMessage('Please click a dice with the number you would like to freeze.');
							GameAction.setStatus('roll', false);
							GameAction.setStatus('takeWorm', false);
							GameAction.setStatus('freezeDice', true);
							GameState.save();
						}else{
							PlayerNotification.setMessage('You have bunked!  If possible, you lose your newest worm (leftmost) and the highest grill worm is out of the game.');
							GameAction.setStatus('roll', false);
							GameAction.setStatus('takeWorm', false);
							GameAction.setStatus('freezeDice', false);
							GameAction.setStatus('bunk', true);
							GameState.save();
						}
					}else if(GameAction.status.gameOver===false){
						PlayerNotification.setMessage('You have already rolled, please freeze a dice number group.');
					}
				}
			};
}]);
