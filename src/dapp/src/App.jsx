import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Market from "./components/Market";
import Purchased from "./components/Purchased";
import Profile from "./components/Profile";
import React, { Component, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import processDescription from "./utils/processDescription";
import {
  numOffers,
  getOffers,
  getOffer,
  getPurchasedOffers,
  purchaseOffer,
} from "./services/fakeOfferService";
import http from "./services/httpService";

import { loadWeb3, testBlockchain } from "./services/blockchainService";

class App extends Component {
  state = {
    purchasedOffers: [],
    marketOffers: [],
  };

  handlePurchasedOffers = (newPurchasedOffers) => {
    this.setState({ purchasedOffers: newPurchasedOffers });
  };

  handleMarketOffers = (newMarketOffers) => {
    this.setState({ marketOffers: newMarketOffers });
  };

  async componentDidMount() {
    const offers = getOffers().map((o) => processDescription(o));
    const purchasedOffers = getPurchasedOffers("0x0").map((i) => getOffer(i));
    purchasedOffers.map((o) => processDescription(o));
    this.setState({
      marketOffers: offers,
      purchasedOffers: purchasedOffers,
    });

    loadWeb3();
    testBlockchain();
  }

  handleBuyButtonClick = (index) => {
    const { marketOffers, purchasedOffers } = this.state;
    const offerClicked = marketOffers.find((o) => o.index === index);
    marketOffers.splice(marketOffers.indexOf(offerClicked), 1);
    purchasedOffers.push(offerClicked);

    console.log("Clicked offer ", index);
    this.setState({ marketOffers, purchasedOffers });

    purchaseOffer("0x0", index);

    //TODO: Call Smart Contract
  };

  downloadObjectAsJson = (exportObj, exportName) => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));

    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  handleDownloadDataButtonClick = async (index) => {
    const offerClicked = this.state.purchasedOffers.find(
      (o) => o.index === index
    );
    // console.log(offerClicked);
    const { endpointAPI, authorizationHeader } = offerClicked;
    try {
      const result = await http.get(endpointAPI, {
        headers: { Authorization: authorizationHeader },
      });
      const downloadFile = result.data.statements;
      this.downloadObjectAsJson(downloadFile, `OfferData${index}`);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/market"
              render={(props) => (
                <Market
                  className="container"
                  marketOffers={this.state.marketOffers}
                  purchasedOffers={this.state.purchasedOffers}
                  handleBuyButtonClick={this.handleBuyButtonClick}
                  {...props}
                />
              )}
            />
            <Route
              path="/purchased"
              render={(props) => (
                <Purchased
                  purchasedOffers={this.state.purchasedOffers}
                  handleDownloadDataButtonClick={
                    this.handleDownloadDataButtonClick
                  }
                  handleVisualizeDataButtonClick={
                    this.handleVisualizeDataButtonClick
                  }
                  {...props}
                />
              )}
            />
            <Route path="/profile" component={Profile} />
            <Redirect to="/" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
