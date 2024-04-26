import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import animationData from "../../assets/Animation/animation_ln1unld8.json";

const LandingPage = () => {
  return (
    <div className="landing__content">
      <div className="landing__details">
        <h1 className="heading__landing">YO<span>C</span>O</h1>
        <p className="subheading__landing">You Only Convert Once.</p>
        <p className="description__landing">
          Seamlessly transform your PDFs to fully editable DOC files while
          preserving every aspect of the original formatting.
        </p>
        <div>
          <button className="landing__button">
            <Link to="/register">Get Started</Link>
          </button>
        </div>
      </div>
      <div className="animation__section">
        <Lottie
          loop
          animationData={animationData}
          play
          className="Lottie__animation"
        />
      </div>
    </div>
  );
};

export default LandingPage;
