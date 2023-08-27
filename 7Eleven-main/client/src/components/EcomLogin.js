import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

const EcomLogin = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    confirm_password: "",
    phone: "",
    user_type: 1,
  });

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      axios
        .post("http://localhost:3000/api/v1/auth/login", formData)
        .then((response) => {
          console.log(response.data.data);
          localStorage.setItem("ecomm_account_id", response.data.data.user_id);
          localStorage.setItem("ecomm_user_name", response.data.data.name);
          localStorage.setItem("ecomm_user_email", response.data.data.email);
          localStorage.setItem("ecomm_user_phone", response.data.data.phone);
          localStorage.setItem("ecomm_user_type", response.data.data.user_type);
          localStorage.setItem(
            "ecomm_user_address",
            response.data.data.address
          );
          if (response.data.data.account_id !== "") {
            localStorage.setItem(
              "bank_account_id",
              response.data.data.account_id
            );
            localStorage.setItem("bank_pin_code", response.data.data.pin_code);
          }

          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:3000/api/v1/auth/register", formData)
        .then((response) => {
          console.log(response.data.data);
          localStorage.setItem("ecomm_account_id", response.data.data.user_id);
          localStorage.setItem("ecomm_user_name", response.data.data.name);
          localStorage.setItem("ecomm_user_email", response.data.data.email);
          localStorage.setItem("ecomm_user_phone", response.data.data.phone);
          localStorage.setItem(
            "ecomm_user_address",
            response.data.data.address
          );
          localStorage.setItem("ecomm_user_type", response.data.data.user_type);

          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="main">
      <div className="form">
        <h1>MY SHOP</h1>
        <h3 className={isLogin ? "text1 mt-4" : "text1"}>
          {isLogin ? "Log in here" : "Create Account"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className={isLogin ? "input-form mt-4" : "input-form"}>
            {!isLogin && <label htmlFor="user-name">User Name</label>}
            {!isLogin && (
              <input
                name="name"
                type="text"
                id="user-name"
                value={formData.name}
                onChange={handleChange}
              />
            )}
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />

            {!isLogin && <label htmlFor="phone">Phone</label>}
            {!isLogin && (
              <input
                name="phone"
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            )}

            {!isLogin && <label htmlFor="address">Address</label>}
            {!isLogin && (
              <input
                name="address"
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
            )}

            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />

            {!isLogin && (
              <label htmlFor="confirm-password">Confirm Password</label>
            )}
            {!isLogin && (
              <input
                name="confirm_password"
                type="text"
                id="confirm-password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            )}
            {/* <input type="submit" value="Sign Up"></input> */}
            {!isLogin && (
              <input
                type="submit"
                value="Sign Up"
              />
            )}
            {isLogin && (
              <input
                type="submit"
                value="Sign in"
              />
            )}
            <div className="choose-operation">
              <div className="mr-1">
                {isLogin ? "Not registered yet?" : "Already have an account?"}
              </div>
              <div className="btn-2" onClick={toggleLogin}>
                {isLogin ? "Create Account" : "Sign In"}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EcomLogin;
