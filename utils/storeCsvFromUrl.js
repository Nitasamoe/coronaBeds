var http = require('http');
const axios = require("axios");
const fs = require('fs');
const Path = require('path')  

// DEFINE Path
module.exports = async function (urlToSave, fileName) {  
  const url = urlToSave;
  const path = Path.resolve(__dirname, '../dataSets', fileName)
  const writer = fs.createWriteStream(path)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
