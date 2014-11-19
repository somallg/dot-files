var iss = 0;

function countDownSS(a) {
	$.each(userContext.previousAdventureParty.ssItem, function() {
		this.duration_remaining -= 35;
		a && console.log("SS id " + this.item_id + " duration remaining " + this.duration_remaining);
		if (this.duration_remaining < 0) {
	    	a && console.log("getBatchProgress");
	    	getBatchProgress(!1,!1);
	    	setTimeout(function() { 
	    		a && console.log("Send Out SS");
	    		adventurePartySend(!1); }, 5E3);
	    		
	    	return false;
		}
	});
	a && console.log("======================================================");
}

function breadCountDown(a) {
	var sept = userContext.buildingsData[6];
	sept.build_remaining -= 35;
	a && console.log("Bread id " + sept.item_id + " duration remaining " + sept.build_remaining);
	
	if (isNaN(sept.build_remaining) || sept.build_remaining <= 0) {
		a && console.log("doFinishProduction");
		doFinishProduction(sept.item_id);
		if (isNaN(sept.build_remaining) || sept.build_remaining <= 0) {
			a && console.log("doProduction");
			$.ajax({
				url: '/play/set_production/fresh_baked_bread?producer_symbol=sept&quantity=1&recipe_symbol=sept_fresh_baked_bread_recipe',
				success: function(data) {
					doFinishProduction(sept.item_id);
					a && console.log("doProduction Done");
				}
			});
		}
	}
	a && console.log("======================================================");
}

var advInterval = setInterval(function() {
	countDownSS(false);
	breadCountDown(true);
}, 3E4);
