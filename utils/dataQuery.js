const getYoungestDataSetForCountry = require('./getYoungestDataSetForCountry');
const getCurrentCoronaData = require('./getCurrentCoronaData');

// Get Current Data Set For Corona
//getCurrentCoronaData();

// FUNCTIONS
getIntensiveBeds = async function(countryCode, pop) {
  let bedsPer100k = await getYoungestDataSetForCountry("intensiveBeds", countryCode).VALUE * (pop / 100000); 

}

// EXPORT
module.exports =  async function (countryCode) {

  // get all the data in parallel
  let [resultObj, acuteBeds, population, intensiveBedsPer100k, over65] = await Promise.all(
        [getYoungestDataSetForCountry("coronaData", countryCode),
        getYoungestDataSetForCountry("acuteBeds", countryCode),
        getYoungestDataSetForCountry("pop", countryCode),
        getYoungestDataSetForCountry("intensiveBeds", countryCode),
        getYoungestDataSetForCountry("over65", countryCode),
        ]
      );
  
  let queryResult = {};
  queryResult.acuteBeds = acuteBeds.VALUE;
  queryResult.intensiveBeds = parseInt(intensiveBedsPer100k.VALUE * (population.VALUE / 100000 ));
  queryResult.peopleOver65 = parseInt(over65.VALUE * (population.VALUE / 100 ));
  queryResult.new_cases = parseInt(resultObj.new_cases);
  queryResult.new_deaths = parseInt(resultObj.new_deaths);
  queryResult.total_cases = parseInt(resultObj.total_cases);
  queryResult.total_deaths = parseInt(resultObj.total_deaths);
  queryResult.population = population.VALUE;
  queryResult.location = resultObj.location;
 
  return queryResult;
}


