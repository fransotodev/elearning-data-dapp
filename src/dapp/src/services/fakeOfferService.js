const STATUS_AVAILABLE = 0;
const STATUS_PURCHASED = 10;

// offer.endpointAPI, offer.endpointDashboard, offer.authorizationHeader, offer.description, offer.price, offer.status

const data = {
  endpointAPI: "http://192.168.1.69/data/xAPI",
  Offers: [
    {
      endpointDashboard:
        "http://192.168.1.69/dashboards/60224e644952370431965714/6023b1067691600647c3b16e/Shareable",
      authorizationHeader:
        "Basic NjM4NmM5NDhhYjZiMjEwNjlkNzE1YmZmZGNhMWYzZDRhN2FiZWQ3ZTo1ZTkxNDFjYTRiMTdmMDdmYjhiZDA4YTIyOWYwMWJlNWQ3NmZkNGNj",
      numStatements: 261,
      date: "March-May 2020",
      description:
        "Nationwide Mutual Insurance Company, Advanced Micro Devices, Deree, UGI Corporation, eBay, Whole Foods Market, Susser Holdings Corporation, EOG Resources, Advance Auto Parts, Applied Materials",
      price: 10,
      statuts: STATUS_AVAILABLE,
    },
    {
      endpointDashboard:
        "http://192.168.1.69/dashboards/6023b1b47691600647c3b185/6023b2b87691600647c3b1b6/Shareable",
      authorizationHeader:
        "Basic NjBjMTZlMDkxNjAyZTEyOWUwYjUyZTMxNzczYTI5Y2U3MzI5NmU1NDo4YzcwOGNiOTE2ODgxNzY2MDNjYzM1NThmNTZiOTIyOTVkOGZlZWFm",
      numStatements: 278,
      date: "March-April 2020",
      description:
        "UGI Corporation, Ross Stores, Applied Materials, Murphy Oil, Nationwide Mutual Insurance Company, eBay, Expeditors International, Whole Foods Market, Advanced Micro Devices, Susser Holdings Corporation",
      price: 10,
      statuts: STATUS_AVAILABLE,
    },
    {
      endpointDashboard:
        "http://192.168.1.69/dashboards/6023b36e7691600647c3b1f7/6023b38f7691600647c3b20c/Shareable",
      authorizationHeader:
        "Basic NWI5ZWZjNDE5YjAzOTYzNTcwMGJiZjI1NzI4ZTRmYWE3MzY0OTRkNjowMTE4YWVkNzhhMGZmNGFhY2Y0NTlkMDI4MTFkYzE3MTA5MThkNGI0",
      numStatements: 265,
      date: "April-April 2020",
      description:
        "Deree, C. H. Robinson Worldwide, ConocoPhillips, Anixter, Advanced Micro Devices Assurant, Starwood Hotels and Resorts Worldwide, Computer Sciences Corporation, Ameriprise Financial, Wells Fargo",
      price: 400,
      statuts: STATUS_PURCHASED,
    },
    {
      endpointDashboard:
        "http://192.168.1.69/dashboards/6023b6407691600647c3b216/6023b6d17691600647c3b22b/Shareable",
      authorizationHeader:
        "Basic M2RlYTdkZjAxMjM0ODVlN2E2Yjk0MTFiOWE4YjM5NDY0ZDczYWE3OTowYmQ4Y2E4N2EzOWQ2NDllMjA5ODI0YzdlY2RmMDRhNWMxMzVhMjll",
      numStatements: 233,
      date: "March-May 2020 ",
      description:
        "Overall attitude with customers and colleagues?, How is their work ethic?, Are they likely to pull in others to close sales?, EOG Resources, Johnson Controls, Sherwin-Williams, Con-way, Health Net, Lowe's, Kimberly-Clark",
      price: 400,
      statuts: STATUS_PURCHASED,
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
  const copyOffers = [...data.Offers];
  console.log("FAKE SERVICE", copyOffers[0].description);

  return copyOffers;
}

export function getOffer(id) {
  return data.Offers[id];
}

export function getPurchasedOffers(account) {
  return data.purchasedOffers[account];
}
/*
export function purchaseOffer(account, id) {
  if (data.purchasedOffers[account] !== undefined) {
    data.purchasedOffers[account].push(id);
  } else {
    data.purchasedOffers[account] = [id];
  }
  return getOffer(id);
}
*/
