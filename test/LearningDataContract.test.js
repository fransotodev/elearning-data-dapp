const GeneralTests = require("./unit/General.test");
const RegisterOfferTests = require("./unit/RegisterOffer.test");
const PurchaseOfferTests = require("./unit/PurchaseOffer.test");
const GetOfferTests = require("./unit/GetOffer.test");

const { Config } = require("../config/testConfig");

contract("Smart Contract tests", async (accounts) => {
  this.config;
  this.Offer;
  this.reusableFunctions;

  before("Setup", async () => {
    config = await Config(accounts);

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

  describe("General Tests", GeneralTests.bind(this));

  describe("registerOffer() Tests", RegisterOfferTests.bind(this));

  describe("purchaseOffer() tests", PurchaseOfferTests.bind(this));

  describe("getOffer() tests", GetOfferTests.bind(this));
});
