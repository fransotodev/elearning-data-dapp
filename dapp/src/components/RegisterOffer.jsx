import React, { useState } from "react";
import { registerOffer } from "./../services/blockchainService";
import validateFormData from "./../utils/validateFormData";
import InputElement from "./common/InputElement";
const RegisterOffer = () => {
  const [typingAccount, setTypingAccount] = useState("");
  const [formData, setFormData] = useState({});

  function handleAddAccount() {
    //Set form data to old form data and then overwrite the property accounttoPay
    if (typingAccount) {
      setFormData({
        ...formData,
        accountsToPay: formData.accountsToPay
          ? formData.accountsToPay.concat(typingAccount)
          : [typingAccount],
      });
      setTypingAccount("");
    }
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
    const result = await validateFormData(formData);

    if (result) {
      //   console.log("Form data is valid");
      registerOffer(formData);
    } else {
      //   console.log("form data is invalid");
    }
  }

  return (
    <div className="container mt-4">
      <div className="form-row">
        <div className="col-md-6">
          <InputElement
            id={"endpointAPI"}
            labelText={"Endpoint API:"}
            type={"text"}
            onChange={handleChangeTyping}
          />
        </div>

        <div className="col-md-6">
          <InputElement
            id={"endpointDashboard"}
            labelText={"Endpoint Dashboard:"}
            type={"text"}
            onChange={handleChangeTyping}
          />
        </div>
      </div>

      {/* Full Width Properties */}
      <InputElement
        id={"authHeader"}
        labelText={"Authorization Header:"}
        type={"text"}
        onChange={handleChangeTyping}
        helpText={
          <>
            Introduce here an authorization header
            <strong> created for this particular offer</strong>. The system will
            validate it can access the data before uploading to the blockchain.
          </>
        }
      />

      <InputElement
        id={"description"}
        labelText={"Description:"}
        type={"text"}
        onChange={handleChangeTyping}
        helpText={
          <>
            Format:{" "}
            <i>n Statements | Start-end Date | Comma Separated Keywords</i>
          </>
        }
      />

      <div className="form-row">
        <div className="col-lg-6">
          <InputElement
            id={"accountsToPay"}
            labelText={"Accounts to Pay:"}
            type={"text"}
            onChange={handleChangeTypingAccount}
            inputValue={typingAccount}
            itemPrepend={
              <button className="btn btn-primary" onClick={handleAddAccount}>
                Add Address
              </button>
            }
            extraContent={
              <ul className="mt-3">
                {formData.accountsToPay &&
                  formData.accountsToPay.map((account) => (
                    <li key={account}>{account}</li>
                  ))}
              </ul>
            }
          />
        </div>
        <div className="col-lg-6">
          <InputElement
            id={"price"}
            labelText={"Price:"}
            type={"text"}
            onChange={handleChangeTyping}
            itemPrepend={<div className="input-group-text">ETH</div>}
            extraContent={
              <button
                className="btn btn-primary btn-block mt-3"
                onClick={handleSubmitOffer}
              >
                Submit Offer
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterOffer;
