const truecallerjs = require("truecallerjs");
var countryCode = "IN";
var installationId =
  "";
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
var data = [];
var start = 0;
var end = start + 100;
async function loadData() {
  // var start = 0;
  // for (var start = 0; start < searchData.length; start += 10) {
  var phoneNumbers = searchData.slice(start, end);
  phoneNumbers = phoneNumbers.join(",");
  // var phoneNumbers = "+919140459232"
  const searchResult = truecallerjs.bulkSearch(
    phoneNumbers,
    countryCode,
    installationId
  );
  searchResult.then(function (response) {
    data = JSON.stringify(response, null, 2);
    console.log(data);
  });

  console.log(end, "processed till here");

  // await timer(3000); // then the created Promise can be awaited
  // }
}
// write the results into a excel file after with name , phone number, email and city name

loadData();

var excel = require("excel4node");
var wb = new excel.Workbook();
var ws = wb.addWorksheet("Sheet 1");
var style = wb.createStyle({
  font: {
    color: "#000000",
    size: 12,
  },
  numberFormat: "$#,##0.00; ($#,##0.00); -",
});
var style1 = wb.createStyle({
  font: {
    color: "#000000",
    size: 12,
  },
  numberFormat: "$#,##0.00; ($#,##0.00); -",
});

ws.cell(1, 1).string("Name").style(style);
ws.cell(1, 2).string("Phone Number").style(style);
ws.cell(1, 3).string("Email").style(style);
ws.cell(1, 4).string("City").style(style);

for (var i = 0; i < data.length; i++) {
  ws.cell(i + 2, 1)
    .string(data[i]?.value.name || "NA")
    .style(style1);
  ws.cell(i + 2, 2)
    .string(data[i]?.key || "NA")
    .style(style1);
  ws.cell(i + 2, 3)
    .string(data[i]?.value?.internetAddresses[0]?.id || "NA")
    .style(style1);
  ws.cell(i + 2, 4)
    .string(data[i]?.value?.addresses[0]?.city || "NA")
    .style(style1);
}
wb.write("result.xlsx");
console.log("done");
