import React from "react";
import { useEffect, useState, useRef } from "react";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./EditMatches.module.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

//import date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditMatches() {
  const [Matches, setMatches] = useState("");
  const MatchesOptions = [
    "Saudi Arabia VS Argentina",
    "Saudi Arabia VS Argentina",
    "Saudi Arabia VS Argentina",
  ];

  const [Stadiums, setStadiums] = useState("");
  const StadiumsOptions = [
    "Daniel Siebert",
    "Daniel Siebert",
    "Daniel Siebert",
  ];

  const [Match_Date, set_Match_Date] = useState(new Date());
  const [day_, setDay_] = useState();
  const [month_, setmonth_] = useState();
  const [year, setyear] = useState();

  const [MainReferee, setMainReferee] = useState("");
  const MainRefereeOptions = [
    "Fernando Rapallini",
    "Fernando Rapallini",
    "Fernando Rapallini",
  ];

  const [FirstLinesman, setFirstLinesman] = useState("");
  const FirstLinesmanOptions = [
    "Wilton Sampaio",
    "Wilton Sampaio",
    "Wilton Sampaio",
  ];

  const [SecondLinesman, setSecondLinesman] = useState("");
  const SecondLinesmanOptions = [
    "Daniel Siebert",
    "Daniel Siebert",
    "Daniel Siebert",
  ];

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          {/*--------------------Match part------------------------ */}
          <br />
          <Dropdown
            options={MatchesOptions}
            onChange={(data) => {
              setMatches(data.value);
            }}
            placeholder="Select match"
          />

          {/*--------------------Stadium part------------------------ */}
          <br />
          <Dropdown
            options={StadiumsOptions}
            onChange={(data) => {
              setStadiums(data.value);
            }}
            placeholder="Select stadium"
          />
          {/*--------------------Date part------------------------ */}
          <label>Match Date:</label>
          <DatePicker
            selected={Match_Date}
            onChange={(date) => {
              set_Match_Date(date);
              setDay_(date.getDate());
              setyear(date.getFullYear());
              setmonth_(date.getMonth() + 1);
            }}
          />
          <br />
          {/*--------------------main referee------------------------ */}
          <br />
          <Dropdown
            options={MainRefereeOptions}
            onChange={(data) => {
              setMainReferee(data.value);
            }}
            placeholder="Select the main referee"
          />
          {/*--------------------first Linesmen------------------------ */}
          <br />
          <Dropdown
            options={FirstLinesmanOptions}
            onChange={(data) => {
              setFirstLinesman(data.value);
            }}
            placeholder="Select the first Linesman"
          />
          {/*--------------------second Linesmen------------------------ */}
          <br />
          <Dropdown
            options={SecondLinesmanOptions}
            onChange={(data) => {
              setSecondLinesman(data.value);
            }}
            placeholder="Select the second Linesman"
          />
        </div>
      </div>
    </div>
  );
}
