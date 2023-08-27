import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("bank_account_id");
    localStorage.removeItem("bank_balance");
    history.push("/");
  };

  return (
    <div class="nav-bar">
      <p class="website-name">MY BANK</p>
      <div class="button" onClick={handleClick}>
        <a href="#" class="home">
          Home
        </a>
        <a href="#" class="logout">
          Log Out
        </a>
      </div>
    </div>
  );
};

export default NavBar;
