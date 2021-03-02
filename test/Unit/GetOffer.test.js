const { chai, assert, expect } = require("../testCommon");

module.exports = () => {
  let index;

  beforeEach("Register & buy a mock offer", async () => {
    let result = await reusableFunctions.registerMockOffer();
    index = result.logs[0].args.index.toNumber();

    result = await config.LearningDataContract.purchaseOffer(index, {
      value: Offer.price,
      from: config.firstBuyer,
    });
  });

  it("buyer can access offer data", async () => {
    let result = await config.LearningDataContract.getOffer.call(index, {
      from: config.firstBuyer,
    });

    const {
      0: endpointAPI,
      1: endpointDashboard,
      2: authorizationHeader,
    } = result;

    assert.strictEqual(endpointAPI, Offer.endpointAPI);
    assert.strictEqual(endpointDashboard, Offer.endpointDashboard);
    assert.strictEqual(authorizationHeader, Offer.authorizationHeader);
  });

  it("non-buyer account cannot access offer data", async () => {
    let result = await config.LearningDataContract.getOffer.call(index, {
      from: config.secondBuyer,
    });

    const {
      0: endpointAPI,
      1: endpointDashboard,
      2: authorizationHeader,
    } = result;

    assert.strictEqual(endpointAPI, "");
    assert.strictEqual(endpointDashboard, "");
    assert.strictEqual(authorizationHeader, "");
  });
};
