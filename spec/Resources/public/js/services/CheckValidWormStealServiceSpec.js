
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args.length; i < count; i++) {
    func.apply(this, [args[i]]);
  }
};

describe("CheckValidWormStealServiceTests", function() {
  var CheckValidWormSteal;
  var FrozenDiceArray;
  var GrillWormsArray;
  var GameAction;
  var RandomDice;
  var PlayerNotification;
  var GameState;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (
		  _CheckValidWormSteal_, 
		  _FrozenDiceArray_, 
		  _GrillWormsArray_,
		  _GameAction_,
		  _RandomDice_,
		  _PlayerNotification_,
		  _GameState_
  ) {
	  CheckValidWormSteal = _CheckValidWormSteal_;
	  FrozenDiceArray = _FrozenDiceArray_;
	  GrillWormsArray = _GrillWormsArray_;
	  GameAction = _GameAction_;
	  RandomDice = _RandomDice_;
	  PlayerNotification = _PlayerNotification_;
	  GameState = _GameState_;
  }));
  
  
  it('should have a working CheckValidWormSteal service', inject(['CheckValidWormSteal', function(CheckValidWormSteal) { 
	  expect(CheckValidWormSteal).toHaveMethod("validate");
   	}
  ]));
  
  it('should have return false if attempt to steal with no frozen dice', inject(['CheckValidWormSteal', function(CheckValidWormSteal) { 
	  var result = CheckValidWormSteal.validate(30);
	  
	  expect(result).toBe(false);
   	}
  ]));
  
  it('should have return false if attempt to steal with frozen dice but no worm', inject(['CheckValidWormSteal', 'FrozenDiceArray', function(CheckValidWormSteal, FrozenDiceArray) { 
	  FrozenDiceArray.frozenStatus.sum = 30;
	  var result = CheckValidWormSteal.validate(30);
	  
	  expect(result).toBe(false);
   	}
  ]));
});