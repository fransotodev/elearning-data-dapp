const { chai, assert, expect } = require("../common");

module.exports = () => {
  it("Accepts valid offer", async () => {
    let numOffersBefore = await config.LearningDataContract.numOffers();
    let result = await reusableFunctions.registerMockOffer();
    let numOffersNow = await config.LearningDataContract.numOffers();
    let event = await result.logs[0].args;

    assert.strictEqual(numOffersNow.toNumber(), numOffersBefore.toNumber() + 1);
    assert.strictEqual(event.index.toNumber(), numOffersBefore.toNumber());
    assert.strictEqual(event.description, Offer.description);

    expect(event.accountsToPay).to.be.ofSize(Offer.accountsToPay.length);
    for (let i = 0; i < Offer.accountsToPay.length; i++) {
      expect(event.accountsToPay).to.be.containing(event.accountsToPay[i]);
    }

    assert.strictEqual(event.price.toNumber(), Offer.price);
    assert.strictEqual(event.buyer, config.nullAccount);
    assert.strictEqual(event.status.toNumber(), config.STATUS_AVAILABLE);
  });

  it("returns the index after registration", async () => {
    let numOffersBefore = await config.LearningDataContract.numOffers();
    let result = await config.LearningDataContract.registerOffer.call(
      Offer.endpointAPI,
      Offer.endpointDashboard,
      Offer.authorizationHeader,
      Offer.description,
      Offer.price,
      Offer.accountsToPay
    );

    result.toString().should.be.bignumber.equal(numOffersBefore.toString());
  });

  it("Rejects invalid offers", async () => {
    await config.LearningDataContract.registerOffer().should.be.rejected;
    await config.LearningDataContract.registerOffer(
      "",
      Offer.endpointDashboard,
      Offer.authorizationHeader,
      Offer.description,
      Offer.price,
      Offer.accountsToPay
    ).should.be.rejected;

    await config.LearningDataContract.registerOffer(
      Offer.endpointAPI,
      "",
      Offer.authorizationHeader,
      Offer.description,
      Offer.price,
      Offer.accountsToPay
    ).should.be.rejected;

    await config.LearningDataContract.registerOffer(
      Offer.endpointAPI,
      Offer.endpointDashboard,
      "",
      Offer.description,
      Offer.price,
      Offer.accountsToPay
    ).should.be.rejected;

    await config.LearningDataContract.registerOffer(
      Offer.endpointAPI,
      Offer.endpointDashboard,
      "",
      Offer.authorizationHeader,
      Offer.price,
      Offer.accountsToPay
    ).should.be.rejected;

    await config.LearningDataContract.registerOffer(
      Offer.endpointAPI,
      Offer.endpointDashboard,
      Offer.description,
      Offer.authorizationHeader,
      0,
      Offer.accountsToPay
    ).should.be.rejected;

    await config.LearningDataContract.registerOffer(
      Offer.endpointAPI,
      Offer.endpointDashboard,
      Offer.description,
      Offer.authorizationHeader,
      -1
    ).should.be.rejected;

    await config.LearningDataContract.registerOffer(
      Offer.endpointAPI,
      Offer.endpointDashboard,
      Offer.description,
      Offer.authorizationHeader,
      Offer.price,
      []
    ).should.be.rejected;
  });
};
