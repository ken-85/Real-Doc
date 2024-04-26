import React, { useState } from "react";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../Features/auth/authSlice";

const NavBar = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const path = location.pathname;

  return (
    <div className="Nav">
      <h2
        className={
          path === "/home" ? "Nav__heading Nav__heading-hidden" : "Nav__heading"
        }
      >
        YO<span>C</span>O
      </h2>
      {!isSignedIn ? (
        <div className="Nav__links">
          <Link to="/home">Home</Link>
          <Link to="/Convert">Convert</Link>
          <Link to="/register">Get Started</Link>
          <Link to="/login">Sign In</Link>
        </div>
      ) : (
        <div className="Nav__links">
          <Link to="/home">Home</Link>
          <Link to="/Convert">Convert</Link>
          <Link to="/dashboard">Dashboard</Link>
          <a
            onClick={() => {
              dispatch(setLogout());
              navigation("/home");
            }}
          >
            <PiSignOut />
          </a>
        </div>
      )}
    </div>
  );
};

export default NavBar;
