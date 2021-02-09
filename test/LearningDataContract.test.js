const { Config } = require("../config/testConfig");
var assert = require("assert");
var chai = require("chai");
chai.use(require("chai-as-promised")).should();

chai.use(require("chai-bignumber")());

const assertArrays = require("chai-arrays");
const { expect } = require("chai");
chai.use(assertArrays);

/*
    describe('text', () => {
        it('text', async () => {

        });
    });
*/

contract("Smart Contract tests", async (accounts) => {
  let config;
  let Offer;

  before("Setup", async () => {
    config = await Config(accounts);
    Offer = {
      endpointAPI: config.mockEndpointAPI,
      endpointDashboard: config.mockEndpointDashboard,
      description: config.mockDescription,
      price: 50, //Price WEI
      accountsToPay: config.accountsToPay,
    };
  });

  //It works!
  describe("General Tests", () => {
    it("Is deployed", async () => {
      var address = await config.LearningDataContract.address;
      assert.notStrictEqual(address, 0x0);
      assert.notStrictEqual(address, "");
      assert.notStrictEqual(address, null);
      assert.notStrictEqual(address, undefined);
    });

    it("Has 0 initial offers", async () => {
      var numOffers = await config.LearningDataContract.numOffers();
      assert.strictEqual(numOffers.toNumber(), 0);
    });
  });

  describe("registerOffer() tests", () => {
    it("Accepts valid offer", async () => {
      var numOffersBefore = await config.LearningDataContract.numOffers();
      var result = await config.LearningDataContract.registerOffer(
        Offer.endpointAPI,
        Offer.endpointDashboard,
        Offer.description,
        Offer.price,
        Offer.accountsToPay
      );
      var numOffersNow = await config.LearningDataContract.numOffers();

      assert.strictEqual(
        numOffersNow.toNumber(),
        numOffersBefore.toNumber() + 1
      );
      var event = await result.logs[0].args;

      assert.strictEqual(event.index.toNumber(), numOffersBefore.toNumber());
      assert.strictEqual(event.description, Offer.description);

      expect(event.accountsToPay).to.be.ofSize(Offer.accountsToPay.length);
      for (var i = 0; i < Offer.accountsToPay.length; i++) {
        expect(event.accountsToPay).to.be.containing(event.accountsToPay[i]);
      }

      assert.strictEqual(event.price.toNumber(), Offer.price);
      assert.strictEqual(event.buyer, config.nullAccount);
      assert.strictEqual(event.status.toNumber(), config.STATUS_AVAILABLE);
    });

    it("Rejects invalid offers", async () => {
      await config.LearningDataContract.registerOffer().should.be.rejected;
      await config.LearningDataContract.registerOffer(
        "",
        Offer.mockEndpointDashboard,
        Offer.description,
        Offer.price,
        Offer.accountsToPay
      ).should.be.rejected;

      await config.LearningDataContract.registerOffer(
        Offer.endpointAPI,
        "",
        Offer.description,
        Offer.price,
        Offer.accountsToPay
      ).should.be.rejected;

      await config.LearningDataContract.registerOffer(
        Offer.endpointAPI,
        Offer.endpointDashboard,
        "",
        Offer.price,
        Offer.accountsToPay
      ).should.be.rejected;

      await config.LearningDataContract.registerOffer(
        Offer.endpointAPI,
        Offer.endpointDashboard,
        Offer.description,
        0,
        Offer.accountsToPay
      ).should.be.rejected;

      await config.LearningDataContract.registerOffer(
        Offer.endpointAPI,
        Offer.endpointDashboard,
        Offer.description,
        -1
      ).should.be.rejected;

      await config.LearningDataContract.registerOffer(
        Offer.endpointAPI,
        Offer.endpointDashboard,
        Offer.description,
        Offer.price,
        []
      ).should.be.rejected;
    });
  });

  describe("purchaseOffer() tests", () => {
    var index;
    var BN = web3.utils.BN;

    beforeEach("Register a mock offer", async () => {
      var result = await config.LearningDataContract.registerOffer(
        Offer.endpointAPI,
        Offer.endpointDashboard,
        Offer.description,
        Offer.price,
        Offer.accountsToPay
      );

      index = result.logs[0].args.index.toNumber();
    });

    it("purchases offer", async () => {
      var result = await config.LearningDataContract.purchaseOffer(index, {
        value: Offer.price,
        from: config.firstBuyer,
      });
      var event = await result.logs[0].args;

      assert.strictEqual(event.index.toNumber(), index);
      assert.strictEqual(event.description, Offer.description);
      assert.strictEqual(event.price.toNumber(), Offer.price);

      expect(event.accountsToPay).to.be.ofSize(Offer.accountsToPay.length);
      for (var i = 0; i < Offer.accountsToPay.length; i++) {
        expect(event.accountsToPay).to.be.containing(event.accountsToPay[i]);
      }

      assert.strictEqual(event.buyer, config.firstBuyer);
      assert.strictEqual(event.status.toNumber(), config.STATUS_PURCHASED);
    });

    it("Substracts balance & gas from buyer", async () => {
      var previousBuyerBalance = new BN(
        await web3.eth.getBalance(config.firstBuyer)
      );

      var result = await config.LearningDataContract.purchaseOffer(index, {
        value: Offer.price,
        from: config.firstBuyer,
      });

      //Buyer Balance
      var newBuyerBalance = new BN(
        await web3.eth.getBalance(config.firstBuyer)
      );
      newBuyerBalance
        .add(new BN(Offer.price))
        .toString()
        .should.be.bignumber.lessThan(previousBuyerBalance.toString());
    });

    it("Sends eth to accounts to pay", async () => {
      var initialBalances = [];
      for (var i = 0; i < config.accountsToPay.length; i++) {
        initialBalances[i] = new BN(
          await web3.eth.getBalance(config.accountsToPay[i])
        );
      }

      var result = await config.LearningDataContract.purchaseOffer(index, {
        value: Offer.price,
        from: config.firstBuyer,
      });

      var newBalances = [];

      for (var i = 0; i < config.accountsToPay.length; i++) {
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
  });
});
