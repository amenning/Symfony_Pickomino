angular.module('pickominoGame')			
		
.factory("FreezeDiceAction", [
    'GameAction',
    'CheckValidDiceFreeze',
    'ActiveDiceArray',
    'SetDiceImage',
    'ActiveDiceFilter',
    'FrozenDiceArray',
    'GrillWormsArray',
    'PlayerNotification',
    'GameState',
    function FreezeDiceActionFactory(GameAction, CheckValidDiceFreeze, ActiveDiceArray, SetDiceImage, ActiveDiceFilter, FrozenDiceArray, GrillWormsArray, PlayerNotification, GameState){
		return {
			freeze: function(diceValue){
				if(GameAction.status.freezeDice===true){
					if(CheckValidDiceFreeze.validate(diceValue)){
						ActiveDiceArray.removeHighlight();
						diceImage = SetDiceImage.imagify(diceValue);
						count = ActiveDiceFilter.count(diceValue);
						for(var x=0; x<count; x++){
							FrozenDiceArray.add({value: diceValue, image: diceImage});	
						}
						ActiveDiceArray.remove(diceValue);
						GameAction.setStatus('roll', true);
						GameAction.setStatus('takeWorm', true);
						GameAction.setStatus('freezeDice', false);
						if(FrozenDiceArray.frozenStatus.haveWorm){
							GrillWormsArray.highlightWorms(FrozenDiceArray.frozenStatus.sum);
						}
						PlayerNotification.setMessage('Please click "roll", or click the worm you would like to take.');
						GameState.save();
					}else{
						PlayerNotification.setMessage('You already froze that number! Please pick a different number.');
					}
				}else if(GameAction.status.gameOver===false){
					PlayerNotification.setMessage('You need to take a worm or reroll the dice.');
				}
			}
		};
}]);