import React, { useState } from "react";
import { registerOffer } from "./../services/blockchainService";
import validateFormData from "./../utils/validateFormData";
import InputElement from "./common/InputElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

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
      console.log("Form data is valid");
      try {
        await registerOffer(formData, () => {
          console.log("REGISTER TOAST NOTIFICATION");
          toast.success("✅ Offer Registered ", {
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
      } catch (error) {
        console.log("The offer was not registered toast");
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
    } else {
      console.log("Form data errors here");
    }
  }

  function handleDeleteAccountFromList(index) {
    setFormData({
      ...formData,
      accountsToPay: formData.accountsToPay.filter((a, i) => i !== index),
    });
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="form-row">
        <div className="col-md-6">
          <InputElement
            id={"endpointAPI"}
            labelText={"Endpoint API:"}
            type={"text"}
            onChange={handleChangeTyping}
            inputValue={formData["endpointAPI"] || ""}
          />
        </div>

        <div className="col-md-6">
          <InputElement
            id={"endpointDashboard"}
            labelText={"Endpoint Dashboard:"}
            type={"text"}
            onChange={handleChangeTyping}
            inputValue={formData["endpointDashboard"] || ""}
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
        inputValue={formData["description"] || ""}
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
