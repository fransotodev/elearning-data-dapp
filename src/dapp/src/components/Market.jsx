import React, { Component } from "react";
import OfferTable from "./common/OfferTable";
import {
  numOffers,
  getOffers,
  getOffer,
  getPurchasedOffers,
  purchaseOffer,
} from "../services/fakeOfferService";
import processDescription from "./../utils/processDescription";

import BuyButton from "./BuyButton";

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    console.log("Mounting market");
    const Offers = getOffers();

    this.setState({ data: Offers });
  }

  render() {
    const columns = [
      {
        name: "Statements",
        path: "numStatements",
      },
      {
        name: "Description",
        path: "description",
      },
      {
        name: "Date",
        path: "date",
      },
      {
        name: "Price",
        path: "price",
      },
      {
        name: "",
        path: "",
        content: (data) => <BuyButton />,
      },
    ];
    return (
      <React.Fragment>
        <OfferTable columns={columns} data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Market;
