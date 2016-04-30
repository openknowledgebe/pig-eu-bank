$(document).ready(function()
{

   // PIGEUBANK.data.init();
   
   var source = "result.json";
   var countries;
   var map;
   
    $.getJSON(source, {
        format: "json",
        cache: false
    })
    .done(function(data) {
        countries = parseData(data);

		makeMap();
    });
    
    var lowest = 0;
    var highest = 0;
    
    function parseData(countries) {

		var results = [];
        
        Object.keys(countries).forEach(function(countryKey) {
		    var country = countries[countryKey];
            
            if (country.eu < lowest) {
                lowest = country.eu;
            } 
            
            if (country.eu > highest) {
                highest = country.eu;
            } 
        });
        
        Object.keys(countries).forEach(function(countryKey) {
		    var country = countries[countryKey];
			var result = {};
			result.title = countryKey;
			result.id = country.code;
			result.color = assignColor(country.eu);
			result.customData = country.eu;
			
			results.push(result);
			
            // country
            // country.eu = funding
            // country.population = population
            // country.code = countrycode
            //console.log(country);
            
            
            // Loop categories, can do later
            //Object.keys(country).forEach(function(categoryKey) {
            //    var cat = country[categoryKey];
            //});
        });
		return results;
    }
    
    function componentToHex(c) {
        var hex = c.toString(16);
        console.log(c);
        
        return hex.length == 1 ? "0" + hex : hex;
        
    }
    
	function assignColor(value) {
        
        var percent = value / highest  * 100;
        
        var r = Math.floor(255 * percent / 100);
        var g = Math.floor(255 * (100 - percent) / 100);
        var b = 0;
        
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	function makeMap() {
		map = AmCharts.makeChart("chartdiv", {

			type: "map",
			"theme": "light",

			dataProvider: {
				map: "worldLow",
				zoomLevel: 3.5,
				zoomLongitude: 10,
				zoomLatitude: 52,
				areas: countries
			},

			areasSettings: {
				rollOverOutlineColor: "#FFFFFF",
				rollOverColor: "#CC0000",
				alpha: 0.8,
				unlistedAreasAlpha: 0.1,
				balloonText: "[[title]] spends on average [[customData]] per capita."
			},


			legend: {
				width: "100%",
				marginRight: 27,
				marginLeft: 27,
				equalWidths: false,
				backgroundAlpha: 0.5,
				backgroundColor: "#FFFFFF",
				borderColor: "#ffffff",
				borderAlpha: 1,
				top: 560,
				left: 0,
				horizontalGap: 10,
				data: [{
					title: "EU member before 2004",
					color: "#67b7dc"
				}, {
						title: "Joined at 2004",
						color: "#ebdb8b"
					}, {
						title: "Joined at 2007",
						color: "#83c2ba"
					}, {
						title: "Joined at 2013",
						color: "#db8383"
					}]
			},
			"export": {
				"enabled": true
			}
		});
	}
    

});