const { chai, assert, expect } = require("../testCommon");

module.exports = () => {
  let index;
  let BN = web3.utils.BN;

  beforeEach("Register a mock offer", async () => {
    let result = await reusableFunctions.registerMockOffer();

    index = result.logs[0].args.index.toNumber();
  });

  it("purchases offer", async () => {
    let result = await config.LearningDataContract.purchaseOffer(index, {
      value: Offer.price,
      from: config.firstBuyer,
    });

    let event = await result.logs[0].args;

    assert.strictEqual(event.index.toNumber(), index);
    assert.strictEqual(event.description, Offer.description);
    assert.strictEqual(event.price.toNumber(), Offer.price);

    expect(event.accountsToPay).to.be.ofSize(Offer.accountsToPay.length);
    for (let i = 0; i < Offer.accountsToPay.length; i++) {
      expect(event.accountsToPay).to.be.containing(event.accountsToPay[i]);
    }

    assert.strictEqual(event.buyer, config.firstBuyer);
    assert.strictEqual(event.status.toNumber(), config.STATUS_PURCHASED);
  });

  it("Receives endpoints and authorization header", async () => {
    let result = await config.LearningDataContract.purchaseOffer.call(index, {
      value: Offer.price,
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

  it("Substracts balance & gas from buyer", async () => {
    let previousBuyerBalance = new BN(
      await web3.eth.getBalance(config.firstBuyer)
    );

    let result = await config.LearningDataContract.purchaseOffer(index, {
      value: Offer.price,
      from: config.firstBuyer,
    });

    //Buyer Balance
    let newBuyerBalance = new BN(await web3.eth.getBalance(config.firstBuyer));
    newBuyerBalance
      .add(new BN(Offer.price))
      .toString()
      .should.be.bignumber.lessThan(previousBuyerBalance.toString());
  });

  it("Sends eth to accounts to pay", async () => {
    let initialBalances = [];
    for (let i = 0; i < config.accountsToPay.length; i++) {
      initialBalances[i] = new BN(
        await web3.eth.getBalance(config.accountsToPay[i])
      );
    }

    let result = await config.LearningDataContract.purchaseOffer(index, {
      value: Offer.price,
      from: config.firstBuyer,
    });

    let newBalances = [];

    for (let i = 0; i < config.accountsToPay.length; i++) {
      newBalances[i] = new BN(
        await web3.eth.getBalance(config.accountsToPay[i])
      );

      assert.strictEqual(
        newBalances[i].toString(),
        initialBalances[i]
          .add(new BN(Offer.price / config.accountsToPay.length))
          .toString()
      );
    }
  });

  it("Rejects invalid purchase attempt", async () => {
    await config.LearningDataContract.purchaseOffer().should.be.rejected;

    await config.LearningDataContract.purchaseOffer(index + 1, {
      value: Offer.price,
      from: config.firstBuyer,
    }).should.be.rejected;

    await config.LearningDataContract.purchaseOffer(index, {
      value: Offer.price - 1,
      from: config.firstBuyer,
    }).should.be.rejected;
  });
};
