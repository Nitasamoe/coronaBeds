var countries = require("i18n-iso-countries");

module.exports =  async function (countryCode) {
  return countries.getName(countryCode, "en", {select: "official"});
}