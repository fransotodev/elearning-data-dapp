//Used to build the dApp before creating the real blockchainService.js
const STATUS_AVAILABLE = 0;
const STATUS_PURCHASED = 10;

var data = {
  Offers: [
    {
      index: 0,
      endpointAPI: "http://192.168.1.70/data/xAPI/statements",
      endpointDashboard:
        "http://192.168.1.70/dashboards/60224e644952370431965714/6023b1067691600647c3b16e/Shareable",
      authorizationHeader:
        "Basic NjM4NmM5NDhhYjZiMjEwNjlkNzE1YmZmZGNhMWYzZDRhN2FiZWQ3ZTo1ZTkxNDFjYTRiMTdmMDdmYjhiZDA4YTIyOWYwMWJlNWQ3NmZkNGNj",
      description:
        "261 Statements | March-May 2020 | Nationwide Mutual Insurance Company, Advanced Micro Devices, Deree, UGI Corporation, eBay, Whole Foods Market, Susser Holdings Corporation, EOG Resources, Advance Auto Parts, Applied Materials",
      price: 10,
      status: STATUS_AVAILABLE,
    },
    {
      index: 1,
      endpointAPI: "http://192.168.1.70/data/xAPI/statements",
      endpointDashboard:
        "http://192.168.1.70/dashboards/6023b1b47691600647c3b185/6023b2b87691600647c3b1b6/Shareable",
      authorizationHeader:
        "Basic NjBjMTZlMDkxNjAyZTEyOWUwYjUyZTMxNzczYTI5Y2U3MzI5NmU1NDo4YzcwOGNiOTE2ODgxNzY2MDNjYzM1NThmNTZiOTIyOTVkOGZlZWFm",
      description:
        "276 Statements | March-April 2020 | UGI Corporation, Ross Stores, Applied Materials, Murphy Oil, Nationwide Mutual Insurance Company, eBay, Expeditors International, Whole Foods Market, Advanced Micro Devices, Susser Holdings Corporation",
      price: 10,
      status: STATUS_AVAILABLE,
    },
    {
      index: 2,
      endpointAPI: "http://192.168.1.70/data/xAPI/statements",
      endpointDashboard:
        "http://192.168.1.70/dashboards/6023b36e7691600647c3b1f7/6023b38f7691600647c3b20c/Shareable",
      authorizationHeader:
        "Basic NWI5ZWZjNDE5YjAzOTYzNTcwMGJiZjI1NzI4ZTRmYWE3MzY0OTRkNjowMTE4YWVkNzhhMGZmNGFhY2Y0NTlkMDI4MTFkYzE3MTA5MThkNGI0",
      description:
        "265 Statements | April-April 2020 | Deree, C. H. Robinson Worldwide, ConocoPhillips, Anixter, Advanced Micro Devices Assurant, Starwood Hotels and Resorts Worldwide, Computer Sciences Corporation, Ameriprise Financial, Wells Fargo",
      price: 400,
      status: STATUS_PURCHASED,
    },
    {
      index: 3,
      endpointAPI: "http://192.168.1.70/data/xAPI/statements",
      endpointDashboard:
        "http://192.168.1.70/dashboards/6023b6407691600647c3b216/6023b6d17691600647c3b22b/Shareable",
      authorizationHeader:
        "Basic M2RlYTdkZjAxMjM0ODVlN2E2Yjk0MTFiOWE4YjM5NDY0ZDczYWE3OTowYmQ4Y2E4N2EzOWQ2NDllMjA5ODI0YzdlY2RmMDRhNWMxMzVhMjll",
      description:
        "233 Statements | March-May 2020 | Overall attitude with customers and colleagues?, How is their work ethic?, Are they likely to pull in others to close sales?, EOG Resources, Johnson Controls, Sherwin-Williams, Con-way, Health Net, Lowe's, Kimberly-Clark",
      price: 400,
      status: STATUS_PURCHASED,
    },
  ],
  purchasedOffers: {
    "0x0": [2, 3],
    "0x1": [],
  },
};

export function numOffers() {
  return data.Offers.length;
}

export function getOffers() {
  return data.Offers.filter((o) => o.status !== STATUS_PURCHASED);
}

export function getOffer(id) {
  return data.Offers[id];
}

export function getPurchasedOffers(account) {
  return data.purchasedOffers[account];
}

export function purchaseOffer(account, index) {
  if (data.purchasedOffers[account] !== undefined) {
    data.purchasedOffers[account].push(index);
  } else {
    data.purchasedOffers[account] = [index];
  }
  data.Offers[index].status = STATUS_PURCHASED;
  return getOffer(index);
}
