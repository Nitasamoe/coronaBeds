// Functions
fs = require('fs');

module.exports =  async function (dataSet, country) { 
  let dataSets =  fs.readdirSync("./dataSets");
  
  return dataSets.map(data => {
    if(data.search(".csv") !== -1 ) {
      return {"type": "csv", "name": data.replace(".csv", "")}
    }
    if(data.search(".json") !== -1 ) {
      return {"type": "json", "name": data.replace(".json", "")}
    }
  })
}
