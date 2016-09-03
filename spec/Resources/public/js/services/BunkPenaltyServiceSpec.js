
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
  
  it('should call RandomDice.resetDice', inject(['BunkPenalty', 'PlayerWormsArray', 'GrillWormsArray', 'GameAction', 'RandomDice', 'PlayerNotification', 'GameState', 
                                                 function(BunkPenalty, PlayerWormsArray, GrillWormsArray, GameAction, RandomDice, PlayerNotification, GameState
    ) { 
	  BunkPenalty.penalize();
	  
	  expect(RandomDice.resetDice.calls.count()).toEqual(1);
	  expect(GameAction.setStatus.calls.count()).toEqual(4);
	  expect(GameAction.switchPlayer.calls.count()).toEqual(1);
	  expect(PlayerNotification.setMessage.calls.count()).toEqual(1);
	  expect(GameState.save.calls.count()).toEqual(1);
   	}
  ])); 
});