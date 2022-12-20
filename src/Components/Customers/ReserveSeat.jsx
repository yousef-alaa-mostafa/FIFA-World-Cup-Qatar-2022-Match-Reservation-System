import React from "react";
import { useEffect, useState, useRef } from "react";

// used components
import Navbar from "./Navbar.jsx";

// used style
import style_ from "./Customer.module.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function ReserveSeat() {
  const [seat_, setSeat_] = useState("");
  const [MatchSeats, setMatchSeats] = useState([]);
  const AvailableSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [Matches, setMatches] = useState([]);
  const [chosenMatch, setChosenMatch] = useState("");
  let Matches_ = [
    "fff vs brtb",
    "sdcsd vs wefwef",
    "fff vs brtb",
    "sdcsd vs wefwef",
  ];

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const handleClick = () => {
    setErrMsg("not complete");
  };

  useEffect(() => {
    setMatches(Matches_);
    setMatchSeats([]);
  }, []);

  useEffect(() => {
    setMatchSeats(AvailableSeats);
  }, [chosenMatch]);

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.inner}>
          {/*-------------------- Errors ------------------------ */}
          <p ref={errRef} className={errMsg ? style_.errMsg : style_.offscreen}>
            {errMsg}
          </p>
          {/*-------------------------------------------- */}
          <div style={{ marginTop: "50px" }}></div>

          <br />
          <Dropdown
            options={Matches}
            onChange={(data) => {
              setChosenMatch(data.value);
            }}
            placeholder="Select Match"
          />
          <br />
          <Dropdown
            options={MatchSeats}
            onChange={(data) => {
              setSeat_(data.value);
            }}
            placeholder="Select seat ID"
          />
          {/*--------------------reserve ticket------------------------ */}
          <br />
          <button onClick={handleClick}>Edit Match</button>
        </div>
      </div>
    </div>
  );
}
