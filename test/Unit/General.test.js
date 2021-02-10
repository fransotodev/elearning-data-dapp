const { chai, assert, expect } = require("../common");

module.exports = () => {
  it("Is deployed", async () => {
    let address = await config.LearningDataContract.address;

    assert.notStrictEqual(address, 0x0);
    assert.notStrictEqual(address, "");
    assert.notStrictEqual(address, null);
    assert.notStrictEqual(address, undefined);
  });

  it("Has 0 initial offers", async () => {
    let numOffers = await config.LearningDataContract.numOffers();

    assert.strictEqual(numOffers.toNumber(), 0);
  });
};
