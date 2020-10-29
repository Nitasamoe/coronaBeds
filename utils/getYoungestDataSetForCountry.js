const getJsonDataSet = require('./getJsonDataSet');
const getCsvDataSet = require('./getCsvDataSet');
const readDatasets = require('./readDatasets');
const countryIsoMapper = require('./countryIsoMapper');

module.exports =  async function (dataSet, country) { 
  // Read all files which are in dataSets Directory and give back the file types
  let dataSets = await readDatasets();
  
  // Get full Data Set
  let typeOfSearchedDataSet = dataSets.filter(set => {
    return set.name === dataSet;
  })

  // Setup all different filetypes in the Data Sets and the FN to read them with

  let typeMapper = {
    "json": getJsonDataSet,
    "csv": getCsvDataSet
  }

  // Define which FN is necessary to Read the File Type  
  let allDataSets = await typeMapper[typeOfSearchedDataSet[0].type](dataSet);
  
  try {
    // Handle The Data in The Try Block and get data for specific Country
    let countryDataSet;

    // Handle JSON DataSets
    if(typeOfSearchedDataSet[0].type === "json") {
      // Filter to country
      countryDataSet = allDataSets.filter(set => {
        // Return the Country that was looked for
        return set.COUNTRY === country
      })  
    }

    // Handle CSV DataSets
    if(typeOfSearchedDataSet[0].type === "csv") {
      allDataSets = await getCsvDataSet(dataSet);
      let countryCode = await countryIsoMapper(country)
      // Filter to country
      countryDataSet = allDataSets.filter(set => {
        // Return the Country that was looked for
        return set.location === countryCode
      })  

    }
    
    // Error Cases
    if(countryDataSet.length === 0){
      return "No country with input Code found"
    }  

    // Filter to newest data
    if(countryDataSet[0].YEAR !== undefined || countryDataSet[0].date !== undefined) {

      countryDataSet = countryDataSet.reduce( function(acc, cv){
        if(cv.date !== undefined) {
          cv.YEAR = Number(cv.date.slice(0,4));
          cv.MONTH = Number(cv.date.slice(5,7));
          cv.DAY = Number(cv.date.slice(8,10));
        }

        // Start finding the most recent date
        let recentDate;

        // If the year is taller its clear the cv
        if(cv.YEAR > acc.YEAR) {
          recentDate = cv;
        }
        // If the date ist not bigger check the months if the exist
        else if(cv.MONTH)
        {
          // if the month is bigger take the cv
          if(cv.MONTH > acc.MONTH) {
            recentDate = cv;
          }
          else if(cv.DAY) {
            if(cv.DAY > acc.DAY) {
              recentDate = cv;
            }
            else 
            {
              recentDate = acc;
            }
          }
          else {
            recentDate = acc;
          }
        }
        else
        {
          recentDate = cv;
        }

        return recentDate
      } ,{"YEAR":0, "MONTH":0, "DAY":0})
    }
    else {
      countryDataSet = countryDataSet[0]
    }
    
    // Return Final Data Set
    return countryDataSet

  // Cath Block for Async/Await
  } catch(e) {
    console.log(e)
  }
}