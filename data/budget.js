var fs = require('fs');
var obj = JSON.parse(fs.readFileSync("datasources/rows.json"));
var budget = obj.data.reduce(function(a, b) {
	return a += Number(b[20]);
}, 0);
console.log(budget);
