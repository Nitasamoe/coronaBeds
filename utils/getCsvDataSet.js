const csv = require('csvtojson')

module.exports = async function (dataSet) { 
  const csvFilePath = `./dataSets/${dataSet}.csv`;

  csv()
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
      //console.log(jsonObj);
  })
   
  // Async / await usage
  return await csv().fromFile(csvFilePath);
}
