import React, { useState } from "react";
import { registerOffer } from "./../services/blockchainService";
const RegisterOffer = () => {
  const [typingAccount, setTypingAccount] = useState("");
  const [formData, setFormData] = useState({});

  function handleAddAddress() {
    //Set form data to old form data and then overwrote the property accounttoPay
    setFormData({
      ...formData,
      accountsToPay: formData.accountsToPay
        ? formData.accountsToPay.concat(typingAccount)
        : [typingAccount],
    });
    setTypingAccount("");
  }

  function handleChangeTypingAccount(event) {
    setTypingAccount(event.target.value);
  }

  function handleChangeTyping(event) {
    //Set form data to old form data and then overwrite the property `${event.target.id}`
    setFormData({
      ...formData,
      [`${event.target.id}`]: event.target.value,
    });
  }

  function handleSubmitOffer() {
    console.log("OFFER TO SUBMIT: ", formData);

    //TODO: Validation of data
    // const data = {
    //   endpointAPI: "http://192.168.1.69/data/xAPI/statements",
    //   endpointDashBoard:
    //     "http://192.168.1.69/dashboards/60224e644952370431965714/6023b1067691600647c3b16e/Shareable",
    //   authHeader:
    //     "Basic NjM4NmM5NDhhYjZiMjEwNjlkNzE1YmZmZGNhMWYzZDRhN2FiZWQ3ZTo1ZTkxNDFjYTRiMTdmMDdmYjhiZDA4YTIyOWYwMWJlNWQ3NmZkNGNj",
    //   description: "261 Statements | March-May 2020 | Manual Offer Sumission",
    //   price: "2.61",
    //   accountsToPay: [
    //     "0x97d5ddFCdF768E19D71772Ec020987a4d4966998",
    //     "0x20857AC58F0363f34266216C8924B7B4d44c97cD",
    //     "0x819775868f851778F9b4a3b1e288ceE8e30c332B",
    //   ],
    // };
    registerOffer(formData);
  }
  return (
    <div className="container">
      {/* <form> */}
      <div className="form-row">
        <div className="col-md-6">
          <label htmlFor="endpointAPI" className="form-label mt-4">
            <strong>Endpoint API:</strong>
          </label>
          <input
            type="text"
            className="form-control col"
            id="endpointAPI"
            onChange={handleChangeTyping}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="endpointDashBoard" className="form-label mt-4">
            <strong>Endpoint Dashboard:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="endpointDashBoard"
            onChange={handleChangeTyping}
          />
        </div>
      </div>
      <label htmlFor="authHeader" className="form-label mt-4">
        <strong>Authorization Header:</strong>
      </label>
      <input
        type="text"
        className="form-control "
        id="authHeader"
        onChange={handleChangeTyping}
      />
      <div id="emailHelp" className="form-text text-muted">
        Introduce here an authorization header
        <strong> created for this particular offer</strong>. The system will
        validate it can access the data before uploading to the blockchain.
      </div>

      <label htmlFor="description" className="form-label mt-4">
        <strong>Description:</strong>
      </label>
      <input
        type="text"
        className="form-control "
        id="description"
        onChange={handleChangeTyping}
      />
      <div id="descriptionHelp" className="form-text text-muted">
        Format: <i>n Statements | Start-end Date | Comma Separated Keywords</i>
      </div>

      <div className="form-row">
        <div className="col-6">
          <label htmlFor="accountsToPay" className="form-label mt-4">
            <strong>Accounts to Pay:</strong>
          </label>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control "
              id="accountsToPay"
              value={typingAccount}
              onChange={handleChangeTypingAccount}
            />
            <div className="input-group-prepend">
              <button className="btn btn-secondary" onClick={handleAddAddress}>
                Add Address
              </button>
            </div>
          </div>
        </div>
        <div className="col-6">
          <label htmlFor="price" className="form-label mt-4">
            <strong>Price:</strong>
          </label>

          <div className="input-group mb-2">
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="price"
              onChange={handleChangeTyping}
            />
            <div className="input-group-prepend">
              <div className="input-group-text">ETH</div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-6">
          <ul>
            {formData.accountsToPay &&
              formData.accountsToPay.map((account) => (
                <li key={account}>{account}</li>
              ))}
          </ul>
        </div>
        <div className=" col-6">
          <button
            className="btn btn-primary btn-block"
            onClick={handleSubmitOffer}
          >
            Submit Offer
          </button>
        </div>
      </div>

      {/** */}
      {/* </form> */}
    </div>
  );
};

export default RegisterOffer;
