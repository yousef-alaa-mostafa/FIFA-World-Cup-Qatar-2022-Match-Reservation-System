import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

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
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const successRef = useRef();

  const [Matches, setMatches] = useState("");

  const MatchesOptions = [
    "Saudi Arabia VS Argentina",
    "Saudi Arabia VS Argentina",
    "Saudi Arabia VS Argentina",
  ];

  const [Stadiums, setStadiums] = useState("");
  const [StadiumsOptions, setStadiumsOptions] = useState([
    "Lusail Stadium",
    "Ahmad Bin Ali Stadium",
    "Daniel Siebert",
  ]);

  const [Match_Date, set_Match_Date] = useState(new Date());
  const [day_, setDay_] = useState("");
  const [month_, setmonth_] = useState("");
  const [year, setyear] = useState("");

  const [MainReferee, setMainReferee] = useState("");
  const MainRefereeOptions = [
    "Kim Milton Nielsen",
    "Sandor Puhl",
    "Michel Vautrot",
    "Pedro Proenca",
    "Howard Webb",
    "Markus Merk",
    "Oscar Ruiz",
    "Frank De Bleeckere",
  ];

  const [FirstLinesman, setFirstLinesman] = useState("");
  const FirstLinesmanOptions = [
    "Kim Milton Nielsen",
    "Sandor Puhl",
    "Michel Vautrot",
    "Pedro Proenca",
    "Howard Webb",
    "Markus Merk",
    "Oscar Ruiz",
    "Frank De Bleeckere",
  ];

  const [SecondLinesman, setSecondLinesman] = useState("");
  const SecondLinesmanOptions = [
    "Kim Milton Nielsen",
    "Sandor Puhl",
    "Michel Vautrot",
    "Pedro Proenca",
    "Howard Webb",
    "Markus Merk",
    "Oscar Ruiz",
    "Frank De Bleeckere",
  ];

  const [MatchSeats, setMatchSeats] = useState([]);
  const [chosenMatch, setChosenMatch] = useState("");

  const handleClick = async () => {
    let tempDate = year + "/" + month_ + "/" + day_;
    console.log(day_);
    if (year.length === 0) {
      tempDate = 0;
    }
    let updatedMatch = {
      stadium: Stadiums,
      date: tempDate,
      time: 3,
      lineman1: FirstLinesman,
      lineman2: SecondLinesman,
      referee: MainReferee,
    };

    if (chosenMatch.length > 0) {
      const { data } = await axios.patch(
        `${Route_}matches/editmatch/${chosenMatch}`,
        updatedMatch,
        { validateStatus: false }
      );
      console.log(data);
      if (data.message !== "match updated") {
        setErrMsg(data.message);
      } else if (data.message === "match updated") {
        setSuccessMsg("match updated");
        setErrMsg("");
      }
    } else {
      setErrMsg("chose match");
    }
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);
      axios
        .get("http://localhost:8000/stadiums/getstadiums")
        .then((response) => {
          // console.log(response.data);
          let res = response.data;
          let arr = [];
          for (let i = 0; i < res.length; i++) {
            arr.push(res[i].name);
          }
          setStadiumsOptions(arr);
          console.log(arr);
        });

      let temp_matches = [];
      let temp_matches_with_id = [{ key: "key", value: "value" }];
      for (let i = 0; i < data.length; i++) {
        temp_matches[i] =
          data[i].team1 + " and " + data[i].team2 + " /" + data[i]._id;
      }
      setMatches(temp_matches);
    })();

    setMatchSeats([]);
  }, []);

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          {/*-------------------- Errors ------------------------ */}
          <p ref={errRef} className={errMsg ? style_.errMsg : style_.offscreen}>
            {errMsg}
          </p>
          {/*------------------success------------------ */}
          <p
            ref={successRef}
            className={successMsg ? style_.successMsg : style_.offscreen}
          >
            {successMsg}
          </p>
          {/*--------------------Match part------------------------ */}
          <br />
          <Dropdown
            options={Matches}
            onChange={(data) => {
              setChosenMatch(data.value.split("/")[1]);
              console.log(data.value.split("/")[1]);
            }}
            placeholder="Select Match"
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
              setDay_(date.getDate() + 1);
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
          {/*--------------------second Linesmen------------------------ */}
          <br />
          <button onClick={handleClick}>Edit Match</button>
        </div>
      </div>
    </div>
  );
}
