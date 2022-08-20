// const xlsxj = require("xlsx-to-json");
const fs = require('fs')






const xlsxj = require("xlsx-to-json");
  xlsxj({
    input: './Bank Statment.xls', 
    output: "output.json"
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      console.log(result);
    }
  });





// const wb = xlsx.readFile('./Bank Statment.xls','utf-8');
// // const ws = wb.Sheets('Date')
// console.log(wb);