import React, { useState } from "react";
import { registerOffer } from "../services/blockchainService";
import validateFormData from "../utils/validateFormData";
import InputElement from "./common/InputElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import generateDescription from "../utils/generateDescription";

const RegisterOfferForm = () => {
  const [typingAccount, setTypingAccount] = useState("");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
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

  function mapIdToMessage(path, message) {
    const mapNames = {
      endpointAPI: "Endpoint API",
      endpointDashboard: "Endpoint Dashboard",
      authHeader: "Authorization Header",
      description: "Description",
      accountsToPay: "Accounts to Pay",
      price: "Price",
    };
    if (Array.isArray(path)) path = path[0];

    return message.replace(path, mapNames[path]).replace(/\[[0-9]*\]/g, ""); //So accountsToPay[n] goes like accountToPay and the mapping works
  }

  async function handleSubmitOffer() {
    try {
      const result = await validateFormData(formData);
      const { error } = result;
      if (error) {
        var { path, message } = error.details[0];
        const finalMessage = mapIdToMessage(path, message);

        if (Array.isArray(path)) path = path[0];
        setFormErrors({
          [`${path}`]: finalMessage,
        });
      } else {
        try {
          const description = await generateDescription(
            formData.endpointAPI,
            formData.authHeader
          );
          const offerData = { ...formData, description: description };
          await registerOffer(offerData, () => {
            toast.success(`✅ Offer Registered`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          });
          setFormData({});
          setFormErrors({});
        } catch (error) {
          toast.error("❌ Registration Cancelled", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleDeleteAccountFromList(index) {
    setFormData({
      ...formData,
      accountsToPay: formData.accountsToPay.filter((a, i) => i !== index),
    });
  }

  return (
    <>
      {formErrors["General Error"] && (
        <div className="alert alert-danger" role="alert">
          {formErrors["General Error"]}
        </div>
      )}
      <div className="container mt-4">
        <div className="form-row">
          <div className="col-md-6">
            <InputElement
              id={"endpointAPI"}
              labelText={"Endpoint API:"}
              type={"text"}
              onChange={handleChangeTyping}
              inputValue={formData["endpointAPI"] || ""}
              error={formErrors["endpointAPI"]}
            />
          </div>

          <div className="col-md-6">
            <InputElement
              id={"endpointDashboard"}
              labelText={"Endpoint Dashboard:"}
              type={"text"}
              onChange={handleChangeTyping}
              inputValue={formData["endpointDashboard"] || ""}
              error={formErrors["endpointDashboard"]}
            />
          </div>
        </div>

        {/* Full Width Properties */}
        <InputElement
          id={"authHeader"}
          labelText={"Authorization Header:"}
          type={"text"}
          onChange={handleChangeTyping}
          inputValue={formData["authHeader"] || ""}
          error={formErrors["authHeader"]}
          helpText={
            <>
              Introduce here an authorization header
              <strong> created for this particular offer</strong>. The system
              will validate it can access the data before uploading to the
              blockchain.
            </>
          }
        />

        {/* <InputElement
          id={"description"}
          labelText={"Description:"}
          type={"text"}
          onChange={handleChangeTyping}
          inputValue={formData["description"] || "Auto Generated"}
          error={formErrors["description"]}
          helpText={<>Auto Generated</>}
          disabled={true}
        /> */}

        <div className="form-row">
          <div className="col-lg-6">
            <InputElement
              id={"accountsToPay"}
              labelText={"Accounts to Pay:"}
              type={"text"}
              onChange={handleChangeTypingAccount}
              inputValue={typingAccount}
              error={formErrors["accountsToPay"]}
              itemPrepend={
                <button className="btn btn-primary" onClick={handleAddAccount}>
                  Add Address
                </button>
              }
              extraContent={
                <table className="table ">
                  <tbody>
                    {formData.accountsToPay &&
                      formData.accountsToPay.map((account, index) => (
                        <tr className="row" key={account}>
                          <td className="col-10">{account}</td>
                          <td className="col-2">
                            <FontAwesomeIcon
                              onClick={() => handleDeleteAccountFromList(index)}
                              icon={faTimesCircle}
                              size="lg"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              }
            />
          </div>
          <div className="col-lg-6">
            <InputElement
              id={"price"}
              labelText={"Price:"}
              type={"text"}
              onChange={handleChangeTyping}
              inputValue={formData["price"] || ""}
              error={formErrors["price"]}
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
    </>
  );
};

export default RegisterOfferForm;
