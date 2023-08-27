// import usePinToggle from "../hooks/usePinToggle";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useEffect } from "react";

const BankLogin = () => {
  // const [InputType, ToggleIcon] = usePinToggle();
  const history = useHistory();
  const [formData, setFormData] = useState({
    account_id: "",
    pin_code: "",
  });

  useEffect(() => {
    const bank_account_id = localStorage.getItem("bank_account_id");
    if (bank_account_id != null) {
      history.push("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dhhh");
    axios
      .post("http://localhost:5000/api/v1/auth/login", formData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("bank_account_id", formData.account_id);
        localStorage.setItem("bank_balance", response.data.data.balance);

        history.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });

    setFormData({
      account_id: "",
      pin_code: "",
    });
  };

  return (
    <div className="main">
      <div className="login-form">
        <h1>MY BANK</h1>

        <div className="input-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="account-id">Account ID</label>
            <input
              type="text"
              name="account_id"
              id="account-id"
              value={formData.account_id}
              onChange={handleChange}
            />

            <label htmlFor="pin">PIN Code</label>
            <div className="password-input">
              <input
                type="text"
                name="pin_code"
                id="pin"
                value={formData.pin_code}
                onChange={handleChange}
              />
            </div>

            <input type="submit" value="Login" class="btn btn-primary btn-block btn-large"></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankLogin;
