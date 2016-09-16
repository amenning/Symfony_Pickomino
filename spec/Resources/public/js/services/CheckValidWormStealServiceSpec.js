
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args.length; i < count; i++) {
    func.apply(this, [args[i]]);
  }
};

describe("CheckValidWormStealServiceTests", function() {
  var CheckValidWormSteal;
  var FrozenDiceArray;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (
		  _CheckValidWormSteal_, 
		  _FrozenDiceArray_ 
  ) {
	  CheckValidWormSteal = _CheckValidWormSteal_;
	  FrozenDiceArray = _FrozenDiceArray_;
  }));
  
  
  it('should have a working CheckValidWormSteal service', inject(['CheckValidWormSteal', function(CheckValidWormSteal) { 
	  expect(CheckValidWormSteal).toHaveMethod("validate");
   	}
  ]));
  
  it('should return false if attempt to steal with no frozen dice', inject(['CheckValidWormSteal', function(CheckValidWormSteal) { 
	  var result = CheckValidWormSteal.validate(30);
	  
	  expect(result).toBe(false);
   	}
  ]));
  
  it('should return false if attempt to steal with high enough frozen dice total but no worm', inject(['CheckValidWormSteal', 'FrozenDiceArray', function(CheckValidWormSteal, FrozenDiceArray) { 
	  FrozenDiceArray.frozenStatus.sum = 30;
	  var result = CheckValidWormSteal.validate(30);
	  
	  expect(result).toBe(false);
   	}
  ]));
  
  it('should return false if attempt to steal with not high enough frozen dice total but with worm', inject(['CheckValidWormSteal', 'FrozenDiceArray', function(CheckValidWormSteal, FrozenDiceArray) { 
	  FrozenDiceArray.add({value: 6});
	  var result = CheckValidWormSteal.validate(30);
	  
	  expect(result).toBe(false);
   	}
  ]));
  
  it('should return true if attempt to steal with high enough frozen dice total and with worm', inject(['CheckValidWormSteal', 'FrozenDiceArray', function(CheckValidWormSteal, FrozenDiceArray) { 
	  FrozenDiceArray.add({value: 6});
	  FrozenDiceArray.frozenStatus.sum = 30;
	  var result = CheckValidWormSteal.validate(30);
	  
	  expect(result).toBe(true);
   	}
  ]));
});