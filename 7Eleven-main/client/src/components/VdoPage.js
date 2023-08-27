import "../css/VdoPage.css";

const VdoPage = () => {
  return (
    <div className="body">
      <video src="video.mp4" autoPlay loop muted />
      <div className="container">
        <h3>
          Explore the <br /> Galaxy of Products!
        </h3>
        <p>
          Warning: Our deals are addictive. You might find yourself proposing to
          your shopping cart.
        </p>
      </div>
    </div>
  );
};

export default VdoPage;
//vdopage.css
