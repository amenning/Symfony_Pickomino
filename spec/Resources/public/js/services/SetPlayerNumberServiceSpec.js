
// Dataprovider Function for test filename with certain value
function using(name, args, func){
  for (var i = 0, count = args[0].length; i < count; i++) {
    func.apply(this, [args[0][i], args[1]]);
  }
};

describe("PlayerNumberServiceTests", function() {
  var PlayerNumber;
  var GameAction;
  var GameState;
  
  //beforeEach(module("pickominoGame"));
  beforeEach(angular.mock.module('pickominoGame'));

  beforeEach(inject(function (_PlayerNumber_, _GameAction_, _GameState_) {
	  PlayerNumber = _PlayerNumber_;
	  GameAction = _GameAction_;
	  GameState = _GameState_
  }));
  
  
  it('should have a working PlayerNumber service', inject(['PlayerNumber', function(PlayerNumber, GameAction, GameState) {
       expect(PlayerNumber).toHaveMethod("set");
   	}
  ]));
  
  it('should call GameAction.setStatus and GameState.save four times', inject(['PlayerNumber', 'GameAction', 'GameState', function(PlayerNumber, GameAction, GameState) {
      spyOn(GameAction, 'setStatus').and.stub();
      spyOn(GameState, 'save').and.stub();
  
      var players = 3;
  	  PlayerNumber.set(players)

      expect(GameAction.setStatus.calls.count()).toEqual(4);
  	  expect(GameAction.setStatus.calls.argsFor(0)).toEqual(['numPlayers', players]);
  	  expect(GameAction.setStatus.calls.argsFor(1)).toEqual(['playerSetup', false]);
  	  expect(GameAction.setStatus.calls.argsFor(2)).toEqual(['roll', true]);
  	  expect(GameAction.setStatus.calls.argsFor(3)).toEqual(['gameSetup', false]);
  	  expect(GameState.save.calls.count()).toEqual(1);
  	}
  ]));
});