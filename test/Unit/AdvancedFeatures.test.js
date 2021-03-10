const { chai, assert, expect } = require("../testCommon");

module.exports = () => {
  let index;

  beforeEach("Register mock offer", async () => {
    await config.LearningDataContract.setStatusActive({ from: config.owner });
    let result = await reusableFunctions.registerMockOffer();
    index = result.logs[0].args.index.toNumber();
  });

  it("Only Owner can call onlyOwner functions", async () => {
    await config.LearningDataContract.setStatusActive({ from: config.owner })
      .should.not.be.rejected;

    await config.LearningDataContract.setStatusOnlyQueries({
      from: config.owner,
    }).should.not.be.rejected;

    await config.LearningDataContract.setStatusStopped({ from: config.owner })
      .should.not.be.rejected;

    await config.LearningDataContract.setStatusActive({
      from: config.firstBuyer,
    }).should.be.rejected;

    await config.LearningDataContract.setStatusOnlyQueries({
      from: config.firstBuyer,
    }).should.be.rejected;

    await config.LearningDataContract.setStatusStopped({
      from: config.firstBuyer,
    }).should.be.rejected;
  });

  it("Rejects getOffer, getPurchasedOffersIndexes, registerMockOffer, purchaseOffer with contract stopped", async () => {
    await config.LearningDataContract.setStatusStopped({ from: config.owner });

    config.LearningDataContract.getOffer.call(index).should.be.rejected;
    config.LearningDataContract.getPurchasedOffersIndexes.call(index).should.be
      .rejected;

    reusableFunctions.registerMockOffer().should.be.rejected;

    config.LearningDataContract.purchaseOffer(index).should.be.rejected;
  });

  it("Rejects registerMockOffer, purchaseOffer with contract in OnlyQueries status", async () => {
    await config.LearningDataContract.setStatusOnlyQueries({
      from: config.owner,
    });

    reusableFunctions.registerMockOffer().should.be.rejected;

    config.LearningDataContract.purchaseOffer(index).should.be.rejected;
  });

  it("Allows getOffer, getPurchasedOffersIndexes with contract in OnlyQueries status", async () => {
    await config.LearningDataContract.setStatusOnlyQueries({
      from: config.owner,
    });

    config.LearningDataContract.getOffer.call(index).should.not.be.rejected;
    config.LearningDataContract.getPurchasedOffersIndexes.call(index).should.not
      .be.rejected;
  });
};
