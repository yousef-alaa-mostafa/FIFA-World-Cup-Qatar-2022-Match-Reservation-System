import React from "react";
import { useEffect, useState, useRef } from "react";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./VacantAndReservedSeats.module.css";

//import date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VacantAndReservedSeats() {
  let Matches = [
    0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1,
    0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1,
    0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
  ];

  const color_ = ["#00A300", "#A30000"];
  const status = ["Vacant", "Reserved"];
  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          <div className="container my-5" style={{ margin: "0px !important" }}>
            <div className="row">
              {Matches.map((value, index) => {
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
                        {status[value]}
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
