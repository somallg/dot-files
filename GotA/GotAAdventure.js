function countDownSS(a) {
	$.each(userContext.previousAdventureParty.ssItem, function() {
		this.duration_remaining -= 35;
		a && console.log("SS id " + this.item_id + " duration remaining " + this.duration_remaining);
		
		if (this.duration_remaining <= 0) {
	    	a && console.log("getBatchProgress");
	    	getBatchProgress(!1,!1);
	    	
	    	setTimeout(function() {
	    		$.each(userContext.previousAdventureParty.ssItem, function() {
	    			if (this.duration_remaining <= 0) {
	    				a && console.log("Send Out SS");
	    				adventurePartySend(!1);
	    				
	    				return false;
	    			}
	    		});
	    	}, 5E3);
	    		
	    	return false;
		}
	});
	a && console.log("======================================================");
}

function productionCountDown(b, a) {
	if (!b) {
		return;
	}
	
	var building = userContext.buildingsData[b];
	building.build_remaining -= 35;
	a && console.log("Item id " + building.item_id + " building " + building.symbol + " duration remaining " + building.build_remaining);
	
	if (isNaN(building.build_remaining) || building.build_remaining <= 0) {
		a && console.log("doFinishProduction");
		doFinishProduction(building.item_id);
		if (isNaN(building.build_remaining) || building.build_remaining <= 0) {
			a && console.log("doProduction");
			var url = '';
			if (b == 3) {
				url = 'play/set_production/grains?producer_symbol=bakery&quantity=1&recipe_symbol=village_center_grains_recipe';
			} else if (b == 6) {
				url = 'play/set_production/fresh_baked_bread?producer_symbol=sept&quantity=1&recipe_symbol=sept_fresh_baked_bread_recipe';
			} else if (b == 7) {
				url = 'play/set_production/mead?producer_symbol=godswood&quantity=1&recipe_symbol=godswood_mead_recipe'
			} else if (b == 8) {
				url = 'play/set_production/nettle_poultice?producer_symbol=rhllor_temple&quantity=1&recipe_symbol=rhllor_temple_nettle_poultice';
			} else if (b == 22) {
				//url = 'play/set_production/shortbow?producer_symbol=practice_yard&quantity=1&recipe_symbol=practice_yard_shortbow_recipe';
				url = 'play/set_production/composite_bow?producer_symbol=archery_butts&quantity=1&recipe_symbol=practice_yard_composite_bow_recipe';
			} else if (b == 25) {
				//url = 'play/set_production/light_crossbow?producer_symbol=watchtower&quantity=1&recipe_symbol=watchtower_light_crossbow_recipe';
				url = 'play/set_production/heavy_crossbow?producer_symbol=third_story&quantity=1&recipe_symbol=watchtower_heavy_crossbow_recipe'
			} else {
				console.log("Building number not correct");
				return;
			}
			
			$.ajax({
				url: url,
				success: function(data) {
					doFinishProduction(building.item_id);
					a && console.log("doProduction Done");
				}
			});
		}
	}
	a && console.log("======================================================");
}

var advInterval = setInterval(function() {
	countDownSS(true);
	productionCountDown(3, true);
	productionCountDown(6, true);
	productionCountDown(7, true);
	productionCountDown(8, true);
	productionCountDown(22, true);
	productionCountDown(25, true);
}, 3E4);
