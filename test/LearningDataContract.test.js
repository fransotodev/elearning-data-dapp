const { GeneralTests } = require("./methodsTests/GeneralTests");

const { Config } = require("../config/testConfig");
let assert = require("assert");
let chai = require("chai");
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
  let config = await Config(accounts);
  let Offer;
  let reusableFunctions;

  before("Setup", async () => {
    //config =

    Offer = {
      endpointAPI: config.mockEndpointAPI,
      endpointDashboard: config.mockEndpointDashboard,
      authorizationHeader: config.mockAuthorizationHeader,
      description: config.mockDescription,
      price: 50, //Price WEI
      accountsToPay: config.accountsToPay,
    };

    reusableFunctions = {
      registerMockOffer: () => {
        return config.LearningDataContract.registerOffer(
          Offer.endpointAPI,
          Offer.endpointDashboard,
          Offer.authorizationHeader,
          Offer.description,
          Offer.price,
          Offer.accountsToPay
        );
      },
    };
  });

  describe("General Tests", () => {
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
  });

  describe("registerOffer() tests", () => {
    it("Accepts valid offer", async () => {
      let numOffersBefore = await config.LearningDataContract.numOffers();
      let result = await reusableFunctions.registerMockOffer();
      let numOffersNow = await config.LearningDataContract.numOffers();

      assert.strictEqual(
        numOffersNow.toNumber(),
        numOffersBefore.toNumber() + 1
      );
      let event = await result.logs[0].args;

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
  });

  describe("purchaseOffer() tests", () => {
    let index;
    let BN = web3.utils.BN;

    beforeEach("Register a mock offer", async () => {
      let result = await reusableFunctions.registerMockOffer();

      index = result.logs[0].args.index.toNumber();
    });

    //TODO: Check return values from function call
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
      let newBuyerBalance = new BN(
        await web3.eth.getBalance(config.firstBuyer)
      );
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
  });

  describe("getOffer() tests", () => {
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
  });
});
