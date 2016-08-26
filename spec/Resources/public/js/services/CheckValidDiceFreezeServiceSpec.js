
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args[0].length; i < count; i++) {
    func.apply(this, [args[0][i], args[1]]);
  }
};

describe("CheckValidDiceFreezeFilterServiceTests", function() {
  var CheckValidDiceFreeze;
  var $filter;
  var FrozenDiceArray;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_CheckValidDiceFreeze_, _$filter_, _FrozenDiceArray_) {
	  CheckValidDiceFreeze = _CheckValidDiceFreeze_;
	  FrozenDiceArray = _FrozenDiceArray_;
	  $filter = _$filter_;
  }));
  
  
  it('should have a working CheckValidDiceFreeze service', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) { 
	  expect(CheckValidDiceFreeze).toHaveMethod("validate");
   	}
  ]));
  /*
  it('should count the number of dice with a given value when count() is called', inject(['CheckValidDiceFreeze', 'FrozenDiceArray', '$filter', function(CheckValidDiceFreeze, FrozenDiceArray, $filter) {
	  // The FrozenDiceArray initializes with eight dice of face 6
	  diceCountWithFace6 = CheckValidDiceFreeze.count(6);
	  expect(diceCountWithFace6).toEqual(8);
	  
	  diceCountWithFace1 = CheckValidDiceFreeze.count(1);
	  expect(diceCountWithFace1).toEqual(0);
  	}
  ]));*/
});