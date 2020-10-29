const dataQuery = require('./utils/dataQuery');

const countriesToCompare =
[
  "AUT",
  "BEL",
  "DEU",
  "ITA",
  "FRA",
]

countriesToCompare.forEach(country => {
    dataQuery(country)
    .then(data => {
      console.log(`------ ${country} ------`);
      console.log("total Deaths : " + data.total_deaths);
      console.log("acuteBeds : " + data.acuteBeds);
      console.log("intensiveBeds : " + data.intensiveBeds);
      console.log("peopleOver65 : " + data.peopleOver65);
      console.log("population : " + data.population);
      console.log("relation pop/Death : " + data.total_deaths / data.peopleOver65);
      console.log("relation pop/intensiveBeds : " + data.intensiveBeds / data.peopleOver65);


    })
})
