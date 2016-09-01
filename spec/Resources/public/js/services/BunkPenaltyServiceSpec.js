
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args.length; i < count; i++) {
    func.apply(this, [args[i]]);
  }
};

describe("BunkPenaltyServiceTests", function() {
  var BunkPenalty;
  var $filter;
  var FrozenDiceArray;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_BunkPenalty_) {
	  BunkPenalty = _BunkPenalty_;
  }));
  
  
  it('should have a working BunkPenalty service', inject(['BunkPenalty', function(BunkPenalty) { 
	  expect(BunkPenalty).toHaveMethod("penalize");
   	}
  ])); 
});