import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Market from "./components/Market";
import Purchased from "./components/Purchased";
import Profile from "./components/Profile";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import processDescription from "./utils/processDescription";
import downloadObjectAsJson from "./utils/downloadObjectAsJson";
import http from "./services/httpService";
import { ReactComponent as LoadingIcon } from "./assets/Spinner-1s-200px.svg";

import {
  loadWeb3,
  //numOffers,
  getOffers,
  getOffer,
  getPurchasedOffers,
  purchaseOffer,
  //onEvent,
} from "./services/blockchainService";

class App extends Component {
  state = {
    purchasedOffers: [],
    marketOffers: [],
    errors: {},
    loading: true,
  };

  handlePurchasedOffers = (newPurchasedOffers) => {
    this.setState({ purchasedOffers: newPurchasedOffers });
  };

  handleMarketOffers = (newMarketOffers) => {
    this.setState({ marketOffers: newMarketOffers });
  };

  async componentDidMount() {
    try {
      loadWeb3();
      //onEvent(this.reloadPage); //TODO: Create proper functions to pass onEvent to update only important tables
      var offers = await getOffers();
      offers = offers.map((o) => processDescription(o));

      var purchasedOffersIndexes = await getPurchasedOffers();
      var purchasedOffers = [];

      for (var index of purchasedOffersIndexes) {
        var offer = await getOffer(index);
        offer = processDescription(offer);
        purchasedOffers.push(offer);
      }

      this.setState({
        marketOffers: offers,
        purchasedOffers: purchasedOffers,
        errors: {},
        loading: false,
      });
    } catch (err) {
      this.setState({
        errors: {
          noWeb3:
            "Non-Ethereum browser detected. You should consider trying MetaMask!",
        },
        loading: false,
      });
    }
  }

  handleBuyButtonClick = async (index) => {
    const { marketOffers, purchasedOffers } = this.state;
    const offerClicked = marketOffers.find((o) => o.index === index);

    const purchasedOffer = await purchaseOffer(index);

    const processedPurchasedOffer = await processDescription(purchasedOffer);
    purchasedOffers.push(processedPurchasedOffer);

    marketOffers.splice(marketOffers.indexOf(offerClicked), 1);

    this.setState({ marketOffers, purchasedOffers });
  };

  handleDownloadDataButtonClick = async (index) => {
    const offerClicked = this.state.purchasedOffers.find(
      (o) => o.index === index
    );

    const { endpointAPI, authorizationHeader } = offerClicked;
    try {
      const result = await http.get(endpointAPI, {
        headers: { Authorization: authorizationHeader },
      });
      const downloadFile = result.data.statements;
      downloadObjectAsJson(downloadFile, `OfferData${index}`);
    } catch (error) {
      console.error(error);
    }
  };

  setReloadListener = () => {
    //Reload Application on Metamask Account change
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
  };

  reloadPage = () => {
    window.location.reload();
  };

  renderLoadingIcon = () => {
    return;
  };

  renderApp = () => {
    return <></>;
  };

  getNumStatementsAccount = () => {
    if (this.state.purchasedOffers.length === 0) return 0;

    var result = this.state.purchasedOffers.reduce(
      (acum, current) => (acum += parseInt(current.numStatements)),
      0
    );
    return result;
  };

  render() {
    this.setReloadListener();
    this.getNumStatementsAccount();
    const noErrors = Object.keys(this.state.errors).length === 0;

    if (this.state.loading) {
      return <LoadingIcon />;
    } else {
      return (
        <React.Fragment>
          {noErrors && <Navbar />}

          <main className="container">
            <Switch>
              {!noErrors && (
                <Route
                  path="/info-eth-provider"
                  render={(props) => <h1>Instructions to install Metamask</h1>}
                />
              )}
              {!noErrors && <Redirect to="/info-eth-provider" />}

              <Route exact path="/" component={Home} />
              <Route
                path="/market"
                render={(props) => (
                  <Market
                    marketOffers={this.state.marketOffers}
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
                    {...props}
                  />
                )}
              />
              <Route
                path="/profile"
                render={() => (
                  <Profile
                    numStatements={this.getNumStatementsAccount()}
                    props
                  />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </main>
        </React.Fragment>
      );
    }
  }
}

export default App;
