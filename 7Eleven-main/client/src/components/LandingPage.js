import AllProducts from "./AllProducts";
import NavBar from "./NavBar";
import OptionBar from "./OptionBar";
import VdoPage from "./VdoPage";

const LandingPage = () => {
  return (
    <div className="body">
      <NavBar />
      {/* <VdoPage /> */}
      <AllProducts />
    </div>
  );
};

export default LandingPage;
