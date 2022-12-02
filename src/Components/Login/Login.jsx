import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//used styles
import style_ from "./Login.module.css";

//import images
import img from "./images/fwc.jpg";

//main function
export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
            <p
              ref={errRef}
              className={errMsg ? style_.errMsg : style_.offscreen}
            >
              {errMsg}
            </p>
            <h1>Sign In</h1>
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

              <button type="submit" class="btn btn-danger">
                Sign In
              </button>
            </form>
            <p>
              press sign up for Regestration
              <br />
              <span className="line">
                <Link to="/signup">Sign Up</Link>
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
