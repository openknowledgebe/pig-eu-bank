var fs = require('fs');
var countries = JSON.parse(fs.readFileSync("result.json"));
var csv = "COUNTRY, CATEGORY, VALUE";
Object.keys(countries).forEach(function(countryKey) {
	var country = countries[countryKey];
	Object.keys(country.categories).forEach(function(categoryKey) {
		var category = country.categories[categoryKey];
		csv += "\n" + countryKey.replace(/\n/g, "") + ', ' + categoryKey.replace(/\n/g, "") + ", " + category.eu;
	});
});
fs.writeFileSync('results/categories.csv', csv);
