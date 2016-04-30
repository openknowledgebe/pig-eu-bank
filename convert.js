var fs = require('fs');
var result = convert(JSON.parse(fs.readFileSync("datasources/rows.json")));
var population = JSON.parse(fs.readFileSync("datasources/population.json"));
addPopulation(result);
changeToCapita(result);
fs.writeFileSync('result.json', JSON.stringify(result));

function convert(obj) {
	var countries = {};
	obj.data.forEach(function(entry) {
		var code = entry[8];
		var country = entry[9];
		var category = entry[16];
		var eu = entry[20];
		var nat = entry[21];
		var total = entry[22];
		if (!countries[country]) {
			countries[country] = { code : code, categories : {}, eu : 0};
		}
		if (!countries[country].categories[category]) {
			countries[country].categories[category] = { eu : 0, nat : 0, total : 0};
		}
		countries[country].eu += Number(eu);
		countries[country].categories[category].eu += Number(eu);
		countries[country].categories[category].nat += Number(nat);
		countries[country].categories[category].total += Number(total);
	});
	return countries;
}

function addPopulation(countries) {
	for (var country in countries) {
		if (countries.hasOwnProperty(country)) {
			var pop = population.find(function(pop) {
				return pop.GEO === country && pop.TIME === 2015;
			});
			if (pop) {
				countries[country].population = Number(pop.Value.replace(/,/g,""));
			}
		}
	}
}

function changeToCapita(countries) {
	Object.keys(countries).forEach(function(key) {
		var country = countries[key];
		country.eu /= country.population;
		Object.keys(country.categories).forEach(function(key) {
			var category = country.categories[key];
			category.eu /= country.population;
			category.nat /= country.population;
			category.total /= country.population;
		});
	});
}
