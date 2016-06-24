angular.module('pickominoGame')		
	
.controller("PlayerOptionsController", [
	'GameAction',
	'PlayerNotification',
	'PlayerNumber',
	'RollDice',
	'BunkPenalty',
	function(GameAction, PlayerNotification, PlayerNumber, RollDice, BunkPenalty){
		this.gameStatus = GameAction.status;
		this.messageText = PlayerNotification.message;
		
		this.setPlayers = function(playerCount){
			PlayerNumber.set(playerCount);
		}; 
		
		this.rollDice = function (){
			RollDice.roll();
		};
		
		this.bunkPenalty = function(){
			BunkPenalty.penalize();
		};
		
	}
]);	