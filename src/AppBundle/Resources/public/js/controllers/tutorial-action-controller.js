angular.module('pickominoGame')		
	
.controller("TutorialController", [
	'SetDiceImage', 
	'SetWormImage',
	'CheckValidDiceFreeze', 
	'CheckValidWormTake',
	'CheckValidWormSteal',
	'ActiveDiceFilter', 
	'ActiveDiceArray', 
	'FrozenDiceArray',
	'GrillWormsArray',		
	'PlayerNotification',
	'PlayerWormsArray',
	'RandomDice',
	'GameAction',
	'GameState',
	'$scope',
	function(SetDiceImage, SetWormImage, CheckValidDiceFreeze, CheckValidWormTake, CheckValidWormSteal, ActiveDiceFilter, ActiveDiceArray, FrozenDiceArray, GrillWormsArray, PlayerNotification, PlayerWormsArray, RandomDice, GameAction, GameState, $scope){
		this.activeDice = ActiveDiceArray.array;
		this.frozenDice = FrozenDiceArray.array;
		this.gameStatus = GameAction.status;

		this.setPlayers = function(numPlayers){
			GameAction.setStatus('numPlayers', numPlayers);
			GameAction.setStatus('playerSetup', false);
			GameAction.setStatus('roll', true);
			GameAction.setStatus('gameSetup', false);
		};
		
		this.rollDice = function (){
			if(GameAction.status.roll===true){
				GrillWormsArray.removeWormHighlight();
				RandomDice.roll();
				GameAction.checkMoveAvailable();				
				if(!GameAction.status.bunk){
					PlayerNotification.setMessage('Please click a dice with the number you would like to freeze.');
					GameAction.setStatus('roll', false);
					GameAction.setStatus('takeWorm', false);
					GameAction.setStatus('freezeDice', true);
				}else{
					PlayerNotification.setMessage('You have bunked!  If possible, you lose your newest worm (leftmost) and the highest grill worm is out of the game.');
					GameAction.setStatus('roll', false);
					GameAction.setStatus('takeWorm', false);
					GameAction.setStatus('freezeDice', false);
					GameAction.setStatus('bunk', true);
				}
			}else if(GameAction.status.gameOver===false){
				PlayerNotification.setMessage('You have already rolled, please freeze a dice number group.');
			}
		};
		
		this.freezeDice = function(diceValue){
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
				}else{
					PlayerNotification.setMessage('You already froze that number! Please pick a different number.');
				}
			}else if(GameAction.status.gameOver===false){
				PlayerNotification.setMessage('You need to take a worm or reroll the dice.');
			}
		};
		
		this.takeWorm = function(wormValue){				
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
					}else{
						RandomDice.resetDice();
						GameAction.setStatus('roll', true);
						GameAction.switchPlayer();
						PlayerNotification.setMessage('Please roll the dice.');
					}
				}else{
					PlayerNotification.setMessage('You cannot take that worm tile.');
				}
			}else if(GameAction.status.roll===true){
				PlayerNotification.setMessage('You need to reroll the dice.');
			}
		};
		
		this.stealWorm = function(wormValue, fromPlayer, index){				
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
				}else{
					PlayerNotification.setMessage('You cannot take that worm tile.');
				}
			}
		};			
		
		this.bunkPenalty = function(){
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
		};
	}
]);	