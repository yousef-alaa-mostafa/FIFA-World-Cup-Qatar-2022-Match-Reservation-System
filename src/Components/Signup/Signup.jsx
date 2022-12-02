import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//used styles
import style_ from "./Signup.module.css";

//import images
import img from "./images/fwc.jpg";

// import fontawesome
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [Birth_Date, set_Birth_Date] = useState("");
  const [Gender, setGender] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
    window.open("./", "_self");
  };

  return (
    <>
      <div className="row" id={style_.main_Container}>
        {/* left part */}
        <div
          className="col-sm col-lg-7 col-md-12 col-sm-12 order-lg-1 order-md-2 order-sm-2 order-2"
          id={style_.image}
        >
          <img src={img} width="100%" height="844px"></img>
        </div>
        {/* right part */}
        <div
          className="col-sm col-lg-5 col-md-12 col-sm-12 order-lg-2 order-md-1 order-sm-1 order-1"
          id={style_.form}
        >
          <section>
            <h1>Sign Up</h1>
            <form onSubmit={HandleSubmit}>
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              ></input>
              <laber htmlFor="password">Password:</laber>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              ></input>

              <button type="button" class="btn btn-danger">
                Sign In
              </button>
            </form>
            <p>
              press Login if you have an account
              <br />
              <span className="line">
                <Link to="/login">Login</Link>
                <br />
                <Link to="/home">Go to home</Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
