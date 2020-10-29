const {
  promises
} = require('fs');

module.exports = async function (dataSet) { 
  // Take .json in case of misinput
  dataSet = dataSet.replace(".json", "");

  // Define path for readFile
  let path = `./dataSets/${dataSet}.json`

  // Read Data Set
  var result = await promises.readFile(path, {
    encoding: 'ascii'
  })
  
  return JSON.parse(result);
}





  

  