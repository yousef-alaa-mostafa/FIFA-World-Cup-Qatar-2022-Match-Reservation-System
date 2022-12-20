import React from "react";
import { useEffect, useState, useRef } from "react";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./Customer.module.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function VacantSeats() {
  let Matches = [
    0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1,
    0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1,
    0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
  ];

  const [matchSeats, setMatchSeats] = useState([]);
  let Matches_ = [
    "fff vs brtb",
    "sdcsd vs wefwef",
    "fff vs brtb",
    "sdcsd vs wefwef",
  ];

  const [match_, setMatch_] = useState("");

  const handleClick = () => {
    setMatchSeats(Matches);
  };

  const color_ = ["#00A300", "#A30000"];
  const status = ["Vacant", "Reserved"];
  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          <br />
          <Dropdown
            options={Matches_}
            onChange={(data) => {
              setMatch_(data.value);
            }}
            placeholder="Select seat ID"
          />
          <button type="button" class="btn btn-primary" onClick={handleClick}>
            Show vacant seats for the selected match
          </button>
          <div className="container my-5" style={{ margin: "0px !important" }}>
            <div className="row">
              {matchSeats.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="col-md-2 my-3"
                    id={style_.matchContainer}
                  >
                    <div className="item" id={style_.movies}>
                      <div
                        className="w-100"
                        style={{ backgroundColor: color_[value] }}
                      >
                        {index + " " + "(" + status[value] + ")"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
