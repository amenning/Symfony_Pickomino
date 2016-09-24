
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args.length; i < count; i++) {
    func.apply(this, [args[i]]);
  }
};

describe("BunkPenaltyServiceTests", function() {
  var BunkPenalty;
  var PlayerWormsArray;
  var GrillWormsArray;
  var GameAction;
  var RandomDice;
  var PlayerNotification;
  var GameState;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (
		  _BunkPenalty_, 
		  _PlayerWormsArray_, 
		  _GrillWormsArray_,
		  _GameAction_,
		  _RandomDice_,
		  _PlayerNotification_,
		  _GameState_
  ) {
	  BunkPenalty = _BunkPenalty_;
	  PlayerWormsArray = _PlayerWormsArray_;
	  GrillWormsArray = _GrillWormsArray_;
	  GameAction = _GameAction_;
	  RandomDice = _RandomDice_;
	  PlayerNotification = _PlayerNotification_;
	  GameState = _GameState_;
	  
	  GameAction.setStatus('activePlayer', 0);
	  
	  spyOn(RandomDice, 'resetDice').and.stub();
	  spyOn(PlayerWormsArray, 'removeBunkWorm').and.stub();
	  spyOn(GrillWormsArray, 'addWorm').and.stub();
	  spyOn(GrillWormsArray, 'removeBunkWorm').and.stub();
	  spyOn(GameAction, 'setStatus').and.stub();
	  spyOn(GameAction, 'switchPlayer').and.stub();
	  spyOn(PlayerNotification, 'setMessage').and.stub();
	  spyOn(GameState, 'save').and.stub();
  }));
  
  
  it('should have a working BunkPenalty service', inject(['BunkPenalty', function(BunkPenalty) { 
	  expect(BunkPenalty).toHaveMethod("penalize");
   	}
  ]));
  
  it('should not return a worm or remove grill worm if player has no worm tiles', inject(['BunkPenalty', 'PlayerWormsArray', 'GrillWormsArray', 'GameAction', 'RandomDice', 'PlayerNotification', 'GameState', 
                                                 function(BunkPenalty, PlayerWormsArray, GrillWormsArray, GameAction, RandomDice, PlayerNotification, GameState
    ) {	  
	  BunkPenalty.penalize();
	  
	  expect(PlayerWormsArray.removeBunkWorm.calls.count()).toEqual(0);
	  expect(GrillWormsArray.addWorm.calls.count()).toEqual(0);
	  expect(GrillWormsArray.removeBunkWorm.calls.count()).toEqual(0);
	  
	  expect(RandomDice.resetDice.calls.count()).toEqual(1);
	  expect(RandomDice.resetDice.calls.argsFor(0)).toEqual([]);
	  
	  expect(GameAction.setStatus.calls.count()).toEqual(4);
	  expect(GameAction.setStatus.calls.argsFor(0)).toEqual(['roll', true]);
	  expect(GameAction.setStatus.calls.argsFor(1)).toEqual(['takeWorm', false]);
	  expect(GameAction.setStatus.calls.argsFor(2)).toEqual(['freezeDice', false]);
	  expect(GameAction.setStatus.calls.argsFor(3)).toEqual(['bunk', false]);
	  
	  expect(GameAction.switchPlayer.calls.count()).toEqual(1);
	  expect(GameAction.switchPlayer.calls.argsFor(0)).toEqual([]);
	  
	  expect(PlayerNotification.setMessage.calls.count()).toEqual(1);
	  expect(PlayerNotification.setMessage.calls.argsFor(0)).toEqual(['You can now reroll the dice.']);
	  
	  
	  expect(GameState.save.calls.count()).toEqual(1);
	  expect(GameState.save.calls.argsFor(0)).toEqual([]);
   	}
  ]));
  
  it('should return a worm or remove grill worm if player has at least one worm tile', inject(['BunkPenalty', 'PlayerWormsArray', 'GrillWormsArray', 'GameAction', 'RandomDice', 'PlayerNotification', 'GameState', 
                                                                                           function(BunkPenalty, PlayerWormsArray, GrillWormsArray, GameAction, RandomDice, PlayerNotification, GameState
  ) {	  
	  // Seed playerwormsarray here with one tile
	  wormValue = 25;
	  PlayerWormsArray.addWorm(wormValue);
	  
	  BunkPenalty.penalize();
	  
	  expect(PlayerWormsArray.removeBunkWorm.calls.count()).toEqual(1);
	  expect(PlayerWormsArray.removeBunkWorm.calls.argsFor(0)).toEqual([]);
	  expect(GrillWormsArray.addWorm.calls.count()).toEqual(1);
	  expect(GrillWormsArray.addWorm.calls.argsFor(0)).toEqual([wormValue]);
	  expect(GrillWormsArray.removeBunkWorm.calls.count()).toEqual(1);
	  expect(GrillWormsArray.removeBunkWorm.calls.argsFor(0)).toEqual([wormValue]);
	  
	  expect(RandomDice.resetDice.calls.count()).toEqual(1);
	  expect(RandomDice.resetDice.calls.argsFor(0)).toEqual([]);
	  
	  expect(GameAction.setStatus.calls.count()).toEqual(4);
	  expect(GameAction.setStatus.calls.argsFor(0)).toEqual(['roll', true]);
	  expect(GameAction.setStatus.calls.argsFor(1)).toEqual(['takeWorm', false]);
	  expect(GameAction.setStatus.calls.argsFor(2)).toEqual(['freezeDice', false]);
	  expect(GameAction.setStatus.calls.argsFor(3)).toEqual(['bunk', false]);
	  
	  expect(GameAction.switchPlayer.calls.count()).toEqual(1);
	  expect(GameAction.switchPlayer.calls.argsFor(0)).toEqual([]);
	  
	  expect(PlayerNotification.setMessage.calls.count()).toEqual(1);
	  expect(PlayerNotification.setMessage.calls.argsFor(0)).toEqual(['You can now reroll the dice.']);
	  
	  
	  expect(GameState.save.calls.count()).toEqual(1);
	  expect(GameState.save.calls.argsFor(0)).toEqual([]);
 	}
]));
});