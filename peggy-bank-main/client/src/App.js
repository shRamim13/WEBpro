import "./App.css";
import "./css/NavBar.css";
import Transactions from "./components/Transactions";
import "./css/Balance.css";
import "./css/BankLogin.css";
import "./css/TransactionHistory.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BankLogin from "./components/BankLogin";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <BankLogin />
          </Route>
          <Route path="/dashboard">
            <Transactions />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
