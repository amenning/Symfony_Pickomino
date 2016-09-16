describe("FreezeDiceActionServiceTests", function() {
  var FreezeDiceAction;
    
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (
		  _FreezeDiceAction_
  ) {
	  FreezeDiceAction = _FreezeDiceAction_;
  }));
  
  
  it('should have a working FreezeDiceAction service', inject(['FreezeDiceAction', function(FreezeDiceAction) { 
	  expect(FreezeDiceAction).toHaveMethod("freeze");
   	}
  ]));
});