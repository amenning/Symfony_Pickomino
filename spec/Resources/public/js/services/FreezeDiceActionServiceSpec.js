describe("FreezeDiceActionServiceTests", function() {
  var FreezeDiceAction;    
  var GameAction;
  var CheckValidDiceFreeze;
  var ActiveDiceArray;
  var SetDiceImage;
  var ActiveDiceFilter;
  var FrozenDiceArray;
  var GrillWormsArray;
  var PlayerNotification;
  var GameState;
    
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (
		  _FreezeDiceAction_,
		  _GameAction_,
		  _CheckValidDiceFreeze_,
		  _ActiveDiceArray_,
		  _SetDiceImage_,
		  _ActiveDiceFilter_,
		  _FrozenDiceArray_,
		  _GrillWormsArray_,
		  _PlayerNotification_,
		  _GameState_
  ) {
	  FreezeDiceAction = _FreezeDiceAction_;
	  GameAction = _GameAction_;
	  CheckValidDiceFreeze = _CheckValidDiceFreeze_;
	  ActiveDiceArray = _ActiveDiceArray_;
	  SetDiceImage = _SetDiceImage_;
	  ActiveDiceFilter = _ActiveDiceFilter_;
	  FrozenDiceArray = _FrozenDiceArray_;
	  GrillWormsArray = _GrillWormsArray_;
	  PlayerNotification = _PlayerNotification_;
	  GameState = _GameState_;
	  
	  spyOn(ActiveDiceArray, 'removeHighlight').and.stub();
	  spyOn(SetDiceImage, 'imagify').and.stub();
	  spyOn(ActiveDiceFilter, 'count').and.stub();
	  spyOn(ActiveDiceArray, 'remove').and.stub();
	  spyOn(PlayerNotification, 'setMessage').and.stub();
	  spyOn(GrillWormsArray, 'highlightWorms').and.stub();
	  spyOn(GameState, 'save').and.stub();
  }));
  
  
  it('should have a working FreezeDiceAction service', inject(['FreezeDiceAction', function(FreezeDiceAction) { 
	  expect(FreezeDiceAction).toHaveMethod("freeze");
   	}
  ]));
  
  it('should not freeze dice if player has already frozen a dice grouping this turn and respond with message', 
	 inject(['FreezeDiceAction',
	         'GameAction',
	         'CheckValidDiceFreeze',
	         'ActiveDiceArray',
	         'SetDiceImage',
	         'ActiveDiceFilter',
	         'FrozenDiceArray',
	         'GrillWormsArray',
	         'PlayerNotification',
	         'GameState', 
             function(
        		  FreezeDiceAction, 
        		  GameAction,
		          CheckValidDiceFreeze,
		          ActiveDiceArray,
		          SetDiceImage,
		          ActiveDiceFilter,
		          FrozenDiceArray,
		          GrillWormsArray,
		          PlayerNotification,
		          GameState
             ) {
		 		GameAction.setStatus('freezeDice', false);
		 		spyOn(CheckValidDiceFreeze, 'validate').and.stub();
		 				 		
		 		FreezeDiceAction.freeze(2);
		 		expect(CheckValidDiceFreeze.validate.calls.count()).toEqual(0);
		 		expect(PlayerNotification.setMessage.calls.count()).toEqual(1);
		 		expect(PlayerNotification.setMessage.calls.argsFor(0)).toEqual(['You need to take a worm or reroll the dice.']);
	 		 }
  ]));
  
  it('should not freeze dice if player a player already has that dice value frozen and respond with message', 
	 inject(['FreezeDiceAction',
	         'GameAction',
	         'CheckValidDiceFreeze',
	         'ActiveDiceArray',
	         'SetDiceImage',
	         'ActiveDiceFilter',
	         'FrozenDiceArray',
	         'GrillWormsArray',
	         'PlayerNotification',
	         'GameState', 
             function(
        		  FreezeDiceAction, 
        		  GameAction,
		          CheckValidDiceFreeze,
		          ActiveDiceArray,
		          SetDiceImage,
		          ActiveDiceFilter,
		          FrozenDiceArray,
		          GrillWormsArray,
		          PlayerNotification,
		          GameState
             ) {
		 		GameAction.setStatus('freezeDice', true);
		 		
		 		spyOn(CheckValidDiceFreeze, 'validate').and.stub();
		 		
		 		FreezeDiceAction.freeze(2);
		 		expect(CheckValidDiceFreeze.validate.calls.count()).toEqual(1);
		 		expect(PlayerNotification.setMessage.calls.count()).toEqual(1);
		 		expect(PlayerNotification.setMessage.calls.argsFor(0)).toEqual(['You already froze that number! Please pick a different number.']);
	 		 }
  ]));
	 
});