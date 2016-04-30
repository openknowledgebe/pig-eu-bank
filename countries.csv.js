var fs = require('fs');
var countries = JSON.parse(fs.readFileSync("result.json"));
var csv = "COUNTRY, VALUE";
for (var country in countries) {
	if (countries.hasOwnProperty(country)) {
		csv += "\n" + country + "," + countries[country].eu;
	}
}
fs.writeFileSync('results/countries.csv', csv);
