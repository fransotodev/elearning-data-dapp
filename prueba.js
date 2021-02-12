const reg = new RegExp("^[0-9]*", "g");
const str =
  "276 Statements | March-April 2020 | UGI Corporation, Ross Stores, Applied Materials, Murphy Oil, Nationwide Mutual Insurance Company, eBay, Expeditors International, Whole Foods Market, Advanced Micro Devices, Susser Holdings Corporation";
console.log(reg.exec(str)[0]);

console.log(str.match(/^[0-9]*/g));
