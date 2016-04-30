var fs = require('fs');
var result = convert(JSON.parse(fs.readFileSync("datasources/rows.json")));
var population = JSON.parse(fs.readFileSync("datasources/population.json"));
addPopulation(result);
changeToCapita(result);
fs.writeFileSync('result.json', JSON.stringify(result));

function convert(obj) {
	var countries = {};
	obj.data.forEach(function(entry) {
		var code = entry[8].trim();
		var country = entry[9].trim();
		var funding = entry[13].trim();
		var category = entry[16].trim();
		var eu = entry[20].trim();
		var nat = entry[21].trim();
		var total = entry[22].trim();
		if (!countries[country]) {
			countries[country] = { code : code, categories : {}, eu : 0 };
		}
		if (!countries[country].categories[category]) {
			countries[country].categories[category] = { fundings : {}, eu: 0, nat: 0, total: 0 };
		}
		if (!countries[country].categories[category].fundings[funding]) {
			countries[country].categories[category].fundings[funding] = { eu : 0, nat : 0, total : 0 };
		}
		countries[country].eu += Number(eu);
		countries[country].categories[category].eu += Number(eu);
		countries[country].categories[category].nat += Number(nat);
		countries[country].categories[category].total += Number(total);
		countries[country].categories[category].fundings[funding].eu += Number(eu);
		countries[country].categories[category].fundings[funding].nat += Number(nat);
		countries[country].categories[category].fundings[funding].total += Number(total);
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
	Object.keys(countries).forEach(function(countryKey) {
		var country = countries[countryKey];
		country.eu /= country.population;
		Object.keys(country.categories).forEach(function(categoryKey) {
			var category = country.categories[categoryKey];
			category.eu /= country.population;
			category.nat /= country.population;
			category.total /= country.population;
			Object.keys(category.fundings).forEach(function(fundingKey) {
				var funding = category.fundings[fundingKey];
				funding.eu /= country.population;
				funding.nat /= country.population;
				funding.total /= country.population;
			});
		});
	});
}
