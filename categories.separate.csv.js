var fs = require('fs');
var countries = JSON.parse(fs.readFileSync("result.json"));
Object.keys(countries).forEach(function(key) {
	var country = countries[key];
	var csv = "CATEGORY, VALUE";
	Object.keys(country.categories).forEach(function(key) {
		var category = country.categories[key];
		csv += "\n" + key.replace(/\n/g, "") + ", " + category.eu;
	});
	fs.writeFileSync('results/' + key + '.csv', csv);
});
