import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home";
import Market from "./components/Market";
import Purchased from "./components/Purchased";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import RegisterOfferForm from "./components/RegisterOfferForm";
import ContractStatus from "./components/common/ContractStatus";
import RenderToastContainer from "./components/common/RenderToastContainer";
import Info from "./components/Info";

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
  getContractStatus,
  isContractOwner,
  setContractStatus,
  //onEvent,
} from "./services/blockchainService";
import OwnerMenu from "./components/OwnerMenu";

class App extends Component {
  state = {
    purchasedOffers: [],
    marketOffers: [],
    errors: false,
    loading: true,
    contractStatus: "Active",
    isOwner: false,
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
      //onEvent(() => window.location.reload())); //TODO: Create proper functions to pass onEvent to update only important tables
      const isOwner = await isContractOwner();
      const contractStatus = await getContractStatus();
      if (contractStatus !== "Stopped") {
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
          errors: false,
          loading: false,
          contractStatus: contractStatus,
          isOwner: isOwner,
        });
      } else {
        this.setState({
          contractStatus: contractStatus,
          isOwner: isOwner,
        });
      }
    } catch (err) {
      this.setState({
        errors: true,
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
    if (window.ethereum) {
      //Reload Application on Metamask Account change
      window.ethereum.on("accountsChanged", function (accounts) {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", function (chainId) {
        window.location.reload();
      });
    }
  };

  getNumStatementsAccount = () => {
    if (this.state.purchasedOffers.length === 0) return 0;

    var result = this.state.purchasedOffers.reduce(
      (acum, current) => (acum += parseInt(current.numStatements)),
      0
    );
    return result;
  };

  handleChangeStatusButtonClick = async (text) => {
    await setContractStatus(text);
    window.location.reload();
  };

  render() {
    this.setReloadListener();
    this.getNumStatementsAccount();

    const { errors } = this.state;

    if (this.state.contractStatus === "Stopped") {
      return (
        <>
          <h1 style={{ textAlign: "center" }}>
            This website is stopped by Owner
          </h1>
          {!this.state.isOwner && (
            <ContractStatus color={"danger"} contractStatus={"Stopped"} />
          )}
          {this.state.isOwner && (
            <OwnerMenu
              contractStatus={"Stopped"}
              handleButtonClick={this.handleChangeStatusButtonClick}
            />
          )}
        </>
      );
    } else if (this.state.loading) {
      return <LoadingIcon />;
    } else {
      return (
        <>
          <Navbar />

          <main>
            <RenderToastContainer />

            <Switch>
              {/* ------------------------------HOME------------------------------ */}
              <Route exact path="/" component={Home} />

              {/* ------------------------------INFO------------------------------ */}
              {errors && (
                <Route path="/info-eth-provider" render={(props) => <Info />} />
              )}
              {errors && <Redirect to="/info-eth-provider" />}

              {/* ------------------------------MARKET------------------------------ */}
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

              {/* ------------------------------PURCHASED------------------------------ */}
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
              {/* ------------------------------NEW OFFER------------------------------ */}
              <Route
                path="/new-offer"
                render={() => (
                  <RegisterOfferForm /*createToast={this.createToast}*/ props />
                )}
              />

              {/* ------------------------------PROFILE------------------------------ */}
              <Route
                path="/profile"
                render={() => (
                  <Profile
                    numStatements={this.getNumStatementsAccount()}
                    isOwner={this.state.isOwner}
                    contractStatus={this.state.contractStatus}
                    props
                  />
                )}
              />
              {/* ------------------------------DEFAULT------------------------------  */}
              <Redirect to="/" />
            </Switch>
          </main>
        </>
      );
    }
  }
}

export default App;
