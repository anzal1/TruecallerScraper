const truecallerjs = require("truecallerjs");
var countryCode = "IN";
var installationId =
  "add_auth_token_here";
//use an excel file of phone numbers and extract the phone numbers
//use the phone numbers to search for the details

//use the country code and installation id to search for the details

const excelToJson = require("convert-excel-to-json");
const result = excelToJson({
  sourceFile: "phone_numbers.xlsx",
});

var searchData = result.Sheet1.map(function (item) {
  return item.B;
});

//remove the first element of the array
searchData.shift();

// create an string of phone numbers seperated by comma's using only first 10 items
// phoneNumbers = phoneNumbers.slice(0, 10);
// phoneNumbers = phoneNumbers.join(",");
//now use this in loop to search for the details of the phone numbers 10 at a time
// var start = 0;
// var end = 10;
// for (var i = 0; i < searchData.length; i++) {
//   var phoneNumbers = searchData.slice(start, end);
  //   phoneNumbers = phoneNumbers.join(",");

//   var countryCode = "IN";
// var installationId = "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug";
var phoneNumbers = "+9912345678,+14051234567,+919987654321" // Phone numbers seperated by comma's

const searchResult = truecallerjs.bulkSearch(phoneNumbers,countryCode,installationId)
searchResult.then(function (response) {
    const data = JSON.stringify(response, null, 2);
    console.log(data);
})
//   phoneNumbers = "+9912345678,+14051234567,+919987654321";
//   const searchResult = truecallerjs.bulkSearch(
//     phoneNumbers,
//     countryCode,
//     installationId
//   );
//   searchResult.then(function (response) {
//     const data = JSON.stringify(response, null, 2);
//     console.log(data);
//   });
//   setTimeout(function () {}, 1000);

//   start += 10;
//   end += 10;
// }

// console.log(phoneNumbers);
