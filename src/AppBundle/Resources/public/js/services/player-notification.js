angular.module('pickominoGame')				

.factory("PlayerNotification", [function PlayerNotificationFactory(){
	
	var playerMessage = {info : 'Goal: Try To Collect All The Worms!  Click "Roll" to Start!'};
	
	return {
		message: playerMessage,
		
		setMessage: function(textMessage){
			playerMessage.info = textMessage;
		}
	
	};
}]);	