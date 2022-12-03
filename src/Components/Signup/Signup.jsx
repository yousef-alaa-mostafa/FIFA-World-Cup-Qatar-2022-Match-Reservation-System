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
  const [validName, setValidName] = useState(false); // is name valid or not
  const [userFocus, setUserFocus] = useState(false); // do we have focus on user input field or not

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false); // is password valid or not
  const [PwdFocus, setPwdFocus] = useState(false); // do we have focus on password input field or not

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false); // is match password = password or not
  const [matchFocus, setMatchFocus] = useState(false); // do we have focus on match password input field or not

  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");

  const [Birth_Date, set_Birth_Date] = useState("");
  const [Gender, setGender] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; // to validate the user name
  // starts with lower case or upper case letter
  // followed by 3 to 23 letters
  // upper case or lower case letters or - or _

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // to validate the password
  //atlest one lowercase letter and one uppercase letter one digit(0:9) and one special character

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // to check every time the user changed if it's valid or not
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  // to check every time the pwd or match pwd change if password valid and if password = matched password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd && pwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (validName && validPwd && validMatch) {
      setUser("");
      setPwd("");
      setMatchPwd("");
      window.open("./", "_self");
    }
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
              {/*-------------------- first and last name part------------------------ */}
              <label>
                First name:
                <span className={first_name ? style_.valid : style_.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </label>
              <input
                type="text"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => set_first_name(e.target.value)}
                value={first_name}
                required
              />
              <label>
                Last name:
                <span className={last_name ? style_.valid : style_.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </label>
              <input
                type="text"
                autoComplete="off"
                onChange={(e) => set_last_name(e.target.value)}
                value={last_name}
                required
              />
              {/*-------------------- user name part------------------------ */}
              <label htmlFor="username">
                Username:
                <span className={validName ? style_.valid : style_.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validName || !user ? style_.hide : style_.invalid}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                // ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                className={
                  userFocus && user && !validName
                    ? style_.instructions
                    : style_.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              {/*-------------------- email part------------------------ */}
              <label>
                Email:
                <span className={Email ? style_.valid : style_.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </label>
              <input
                type="text"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                required
              />
              {/*-------------------- password part------------------------ */}

              <label htmlFor="password">
                Password:
                <span className={validPwd ? style_.valid : style_.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPwd || !pwd ? style_.hide : style_.invalid}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              ></input>
              <p
                className={
                  PwdFocus && !validPwd ? style_.instructions : style_.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>

              {/*-------------------- match password part------------------------ */}
              <label htmlFor="confirm_pwd">
                confirm password:
                <span className={validMatch ? style_.valid : style_.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validMatch || !matchPwd ? style_.hide : style_.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={matchPwd ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? style_.instructions
                    : style_.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field
              </p>

              <button type="submit" class="btn btn-danger">
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
