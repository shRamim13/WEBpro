import "./App.css";
import "./css/NavBar.css";
import "./css/Login.css";
import "./css/OptionBar.css";
import "./css/AllProducts.css";
import "./css/Orders.css";
// import "./css/VdoPage.css";

// import "./css/Modal.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import AdminOrders from "./components/AdminOrders";
import EcomLogin from "./components/EcomLogin";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/orders">
            <AdminOrders />
          </Route>
          <Route path="/login">
            <EcomLogin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
