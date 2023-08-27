import "../css/Modal.css";
import { useState } from "react";
import axios from "axios";

const AddPaymentCredential = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    account_id: "",
    pin_code: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const ecomm_account_id = localStorage.getItem("ecomm_account_id");
    axios
      .patch(
        `http://localhost:3000/api/v1/auth/profile/${ecomm_account_id}`,
        formData
      )
      .then((response) => {
        console.log(response.data.data);
        localStorage.setItem("bank_account_id", formData.account_id);
        localStorage.setItem("bank_pin_code", formData.pin_code);
        closeModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="universal-modal-background">
      <div
        className="universal-modal-close"
        onClick={() => {
          closeModal(false);
        }}
      >
        X
      </div>
      <div className="supplier-content">
        <div className="supplier-request">Add Payment Credentials</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="account-id" className="account-id-label">
            Account ID
          </label>
          <input
            type="text"
            id="account-id"
            className="payment-modal-input"
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
          />
          <label htmlFor="pin-code" className="account-id-label ">
            PIN Code
          </label>
          <input
            type="text"
            id="account-id"
            className="payment-modal-input"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleChange}
          />

          <input
            type="submit"
            className="payment-modal-update-btn"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default AddPaymentCredential;

// css code modal.css + orders.css
