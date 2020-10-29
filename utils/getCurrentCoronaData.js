const storeCsvFromUrl = require('./storeCsvFromUrl');


// DEFINE URLs
const coronaData = 'https://covid.ourworldindata.org/data/ecdc/full_data.csv'


module.exports = async function () {  
  storeCsvFromUrl(coronaData, "coronaData.csv");
}
