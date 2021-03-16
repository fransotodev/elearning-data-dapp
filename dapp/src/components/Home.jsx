import React, { useState } from "react";
import image1 from "../assets/Image1.jpg";
import image2 from "../assets/Image2.jpg";
import image3 from "../assets/Image3.jpg";
import { Link } from "react-router-dom";
import LandingRow from "./common/LandingRow";
import { ReactComponent as LoadingIcon } from "../assets/Spinner-1s-200px.svg";

function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const handleLoadImage = () => {
    setImagesLoaded(imagesLoaded + 1);
  };
  const divStyle = imagesLoaded === 3 ? {} : { display: "none" };
  return (
    <>
      <main className="container-fluid bg-light">
        <div style={divStyle}>
          <div className="container marketing">
            <LandingRow
              text1={"Sell your data records"}
              text2={"Completely decentralized"}
              text3={"We just connect you to your customers"}
              image={image1}
              leftAlignment={false}
              onLoad={handleLoadImage}
            />

            <hr className="featurette-divider" />

            <LandingRow
              text1={"Buy data records"}
              text2={"Improve your analytics"}
              text3={"Browse and find the data you need"}
              image={image2}
              leftAlignment={true}
              onLoad={handleLoadImage}
            />

            <hr className="featurette-divider" />

            <LandingRow
              text1={"Secured Smart Contract"}
              text2={"Your data and funds are our priority"}
              text3={
                "With a secure infraestructure, our cyber security team can prevent and defend against cyber attacks"
              }
              image={image3}
              leftAlignment={false}
              onLoad={handleLoadImage}
            />

            <hr className="featurette-divider" />

            <div style={{ marginLeft: "40%", marginRight: "40%" }}>
              <Link to="/market">
                <button
                  className="btn btn-lg btn-primary btn-block"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="font-weight-bold">Get Started</span>
                </button>
              </Link>
            </div>
            <hr className="featurette-divider" />
          </div>
          <footer className="container">
            <p className="float-right">
              <a href="#">Back to top</a>
            </p>
            <p>
              © 2021 eLearning Data dApp by Francisco Manuel Soto Ramírez{" "}
              {/* <a href="#">Privacy</a> · <a href="#">Terms</a> */}
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

export default Home;
