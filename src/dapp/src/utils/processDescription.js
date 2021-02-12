export default function processDescription(o) {
  if (typeof o.description === typeof "") {
    o.numStatements = o.description.match(/^[0-9]*/g)[0];
    o.description = o.description.replace(/^[0-9]* Statements \| /, "");
    o.date = o.description.match(/.*?\|/g)[0].replace(" |", "");
    o.description = o.description.replace(/.*?\| /, "");
    o.description = o.description.split(",");
  }
  return o;
}
