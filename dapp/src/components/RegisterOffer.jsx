import React, { useState } from "react";
import { registerOffer } from "./../services/blockchainService";
import validateFormData from "./../utils/validateFormData";

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

  async function handleSubmitOffer() {
    // console.log("OFFER TO SUBMIT: ", formData);

    const result = await validateFormData(formData);

    if (result) {
      //   console.log("Form data is valid");
      registerOffer(formData);
    } else {
      //   console.log("form data is invalid");
    }
  }
  return (
    <div className="container">
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
          <label htmlFor="endpointDashboard" className="form-label mt-4">
            <strong>Endpoint Dashboard:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="endpointDashboard"
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
    </div>
  );
};

export default RegisterOffer;
