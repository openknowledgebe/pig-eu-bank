# European Structural and Investment Funds per capita

So you want to know how much European funding goes to which country and on what it is spent? This is the right place to find out.

### Data Sources
* [European population] (Eurostat)
* [European Structural and Investment Funds] (ESIF)

### How to do it yourself

Make sure you have [Node.js] installed. Then convert the datasources into one json file:

```bash
node convert.js
```

Generate a csv with the amount invested per capita for every country.
```bash
node countries.csv.js
```
Sample:
```csv
COUNTRY, VALUE
Austria,574.01
Belgium,240.73
...
```
Generate a csv with the amount invested per category, per capita for every country.
```bash
node categories.csv.js
```
Sample:
```csv
COUNTRY, CATEGORY, VALUE
Austria, Research & Innovation, 30.04
Austria, Information & Communication Technologies , 3.11
Belgium, Research & Innovation, 24.68
Belgium, Competitiveness of SMEs, 43.91
...
```
Generate a csv for every country with the amount invested per category, per capita.
```bash
node categories.separate.csv.js
```
Sample:
```csv
CATEGORY, VALUE
Research & Innovation, 24.68
Competitiveness of SMEs, 43.91
...
```



[//]: #

   [European population]: <http://ec.europa.eu/eurostat/web/population-demography-migration-projections/population-data/database>
   [European Structural and Investment Funds]: <https://cohesiondata.ec.europa.eu/dataset/ESIF-FINANCE-DETAILS/e4v6-qrrq>
   [Node.js]: <https://nodejs.org/en/>
