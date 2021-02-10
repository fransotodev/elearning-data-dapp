let chai = require("chai");

chai.use(require("chai-as-promised")).should();
chai.use(require("chai-bignumber")());
chai.use(require("chai-arrays"));

const { expect } = require("chai");
const assert = require("assert");

module.exports.chai = chai;
module.exports.assert = assert;
module.exports.expect = expect;
