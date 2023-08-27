import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  const ecomm_account_id = localStorage.getItem("ecomm_account_id");
  const history = useHistory();
  const handleSignIn = (e) => {
    if (localStorage.getItem("ecomm_account_id") !== null) {
      localStorage.removeItem("ecomm_account_id");
      localStorage.removeItem("ecomm_user_name");
      localStorage.removeItem("ecomm_user_email");
      localStorage.removeItem("ecomm_user_phone");
      localStorage.removeItem("ecomm_user_address");
      localStorage.removeItem("ecomm_user_type");
      localStorage.removeItem("bank_account_id");
      localStorage.removeItem("bank_pin_code");
    }
    history.push("/login");
  };
  return (
    <div className="nav-bar">
      <div className="website-name">MY SHOP</div>
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/orders" className="link">
        My Orders
      </Link>
      <Link to="/" className="link">
        Profile
      </Link>
      <div className="sign-in-btn" onClick={handleSignIn}>
        {ecomm_account_id !== null ? "Logout" : "Sign In"}
      </div>
    </div>
  );
};

export default NavBar;

// css navbar.css
