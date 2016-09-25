
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args[0].length; i < count; i++) {
    func.apply(this, [args[0][i], args[1]]);
  }
};

describe("PlayerNotificationServiceTests", function() {
  var PlayerNotification;
    
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_PlayerNotification_) {
	  PlayerNotification = _PlayerNotification_;
  }));
  
  
  it('should have a working PlayerNotification service', inject(['PlayerNotification', function(PlayerNotification) {
	  expect(PlayerNotification).toHaveObject("message"); 
	  expect(PlayerNotification).toHaveMethod("setMessage");
   	}
  ]));
  
  it('should set the message info text when called with setMessage', inject(['PlayerNotification', function(PlayerNotification) {
	  expect(PlayerNotification.message["info"]).toEqual('Goal: Try To Collect All The Worms!  Click "Roll" to Start!');
	  
	  PlayerNotification.setMessage("test");
	  
	  expect(PlayerNotification.message["info"]).toEqual('test');
  	}
  ]));
});