angular.module('pickominoGame')		
	
.controller("LoginController", [
	'GameAction',
	'GameState',
	'$http',
	'$scope',
	function(GameAction, GameState, $http, $scope){
		this.gameStatus = GameAction.status;
		$scope.message = '';
		this.formData = {};
		
		this.setUser = function(userID, firstname){
			if(userID >= 0){
				GameAction.setStatus('userID', userID);
				GameAction.setStatus('firstname', firstname);
				GameAction.setStatus('gameLogin', false);
				GameAction.setStatus('gameSetup', true);
			}
		};
		
		this.register = function(){
			GameAction.setStatus('gameRegistration', true);
			GameAction.setStatus('gameLogin', false);
		};
		
		this.processForm = function(){
			 $http({
  				method  : 'POST',
  				url     : 'app/assets/php/loginform.inc.php',
  				data    : $.param(this.formData),  // pass in data as strings
  				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 			})
  			.success(function(data) {
				if(data.success===true){
					GameAction.setStatus('userID', data.userID);
					GameAction.setStatus('gameLogin', false);
					GameAction.setStatus('gameSetup', true);
					GameAction.setStatus('firstname', data.firstname);
				}else{
					$scope.message = data.errors.message;
				}
  			});
		};
		
		this.guestLogin = function(){
			var randomPassword = "Guest" + Math.floor((Math.random() * 99999) + 1);
			newGuest = {
				'firstname': "Guest",
				'lastname': "",
				'username': "Guest" + Math.floor((Math.random() * 99999) + 1),
				'password': randomPassword,
				'password_check': randomPassword,
				'email': 'guest@guest.com'					
			};
							
			$http.post("app/assets/php/guest_registration.php", newGuest)
			.success(function(data){
				GameAction.setStatus('gameLogin', false);
				GameAction.setStatus('gameSetup', true);
				GameAction.setStatus('firstname', data.firstname);
				GameAction.setStatus('userID', data.user_id);
			});
		};
	}
]);	