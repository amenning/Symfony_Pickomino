angular.module('pickominoGame')				

.factory("GrillWormsArray", ['SetWormImage', function GrillWromsFactory(SetWormImage){

	var grillWormsArray = [ ];
	
	var deadGrillWormsArray = [ ];
	
	for(var x=21, wormValue, wormImage; x<=36; x++){
		wormValue=x;
		wormImage=SetWormImage.imagify(wormValue);
		grillWormsArray.push({value: wormValue, image: wormImage, canTake: false});
	}

	
	return {
		array: grillWormsArray,

		deadArray: deadGrillWormsArray,
		
		removeWorm: function(wormValue){	
			for(var x=grillWormsArray.length-1; x>=0; x--){
				if(grillWormsArray[x].value === wormValue){
					grillWormsArray.splice(x, 1);
				}
			}
		},
		
		emptyArray: function(array){
			for(var i=array.length; i>0; i--){
				array.pop();
			}
		},
		
		loadGrillWormsState: function(state){
			if(state!==undefined && state.length>=0){
				this.emptyArray(grillWormsArray);
				for(var x=0; x<state.length; x++){
					grillWormsArray.push(state[x]);
				}
			}
		},
		
		loadDeadGrillWormsState: function(state){
			if(state!==undefined && state.length>=0){
				this.emptyArray(deadGrillWormsArray);
				for(var x=0; x<state.length; x++){
					deadGrillWormsArray.push(state[x]);
				}
			}			
		},
		
		addWorm: function(wormValue){
			grillArrayLength = grillWormsArray.length;
			wormImage = SetWormImage.imagify(wormValue);
			inserted = false;
			if(grillWormsArray[grillArrayLength-1].value < wormValue){
				grillWormsArray.push({value: wormValue, image:wormImage, canTake: false});
				inserted = true;
			}
			for(var x=grillArrayLength-1; x>0; x--){
				if(grillWormsArray[x-1].value < wormValue && wormValue < grillWormsArray[x].value){
					grillWormsArray.splice(x, 0, {value: wormValue, image:wormImage, canTake: false});
					inserted = true;
				}
			}				
			if(inserted === false){
				grillWormsArray.unshift({value: wormValue, image:wormImage, canTake: false});
			}
		},
		
		removeBunkWorm: function(wormValue){
			highestGrillWormValue = grillWormsArray[grillWormsArray.length-1].value;
			if(highestGrillWormValue !== wormValue){
				grillWormsArray.pop();
				wormImage = SetWormImage.imagify(highestGrillWormValue);
				deadGrillWormsArray.unshift({value: highestGrillWormValue, image:wormImage});
			}
		},
		
		highlightWorms: function(frozenDiceSum){
			for(var x=grillWormsArray.length-1; x>=0; x--){
				if(grillWormsArray[x].value <= frozenDiceSum){
					grillWormsArray[x].canTake=true;
				}else{
					grillWormsArray[x].canTake=false;
				}
			}
		},
		
		removeWormHighlight: function(){
			for(var x=grillWormsArray.length-1; x>=0; x--){					
					grillWormsArray[x].canTake=false;
			}
		}
	};
}]);