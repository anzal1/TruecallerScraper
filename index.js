const truecallerjs = require("truecallerjs");
var countryCode = "IN";
var installationId =
  "add_token_here";
const excelToJson = require("convert-excel-to-json");
const result = excelToJson({
  sourceFile: "phone_numbers.xlsx",
});

var searchData = result.Sheet1.map(function (item) {
  return item.B;
});

//remove the first element of the array
searchData.shift();
// const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function loadData() {
  // var start = 0;
  // for (var start = 0; start < searchData.length; start += 10) {
  var phoneNumbers = searchData.slice(0, 178);
  phoneNumbers = phoneNumbers.join(",");
  const searchResult = truecallerjs.bulkSearch(
    phoneNumbers,
    countryCode,
    installationId
  );
  searchResult.then(function (response) {
    const data = JSON.stringify(response, null, 2);
    console.log(data);
  });

  // await timer(3000); // then the created Promise can be awaited
  // }
}

loadData();
