import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./AddMatch.module.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

//import date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddMatch() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [FirstCountry, setFirstCountry] = useState("");
  const [secondCountry, setSecondCountry] = useState("");

  const [Stadiums, setStadiums] = useState("");
  const [StadiumsOptions, setStadiumsOptions] = useState([
    "Lusail Stadium",
    "Ahmad Bin Ali Stadium",
    "Daniel Siebert",
  ]);
  const [Match_Date, set_Match_Date] = useState(new Date());
  const [day_, setDay_] = useState();
  const [month_, setmonth_] = useState();
  const [year, setyear] = useState();

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

  const handleClick = async () => {
    // setErrMsg("Not complete");
    let match_date = "";
    if (year && month_ && day_) {
      match_date = year + "/" + month_ + "/" + day_;
    }
    let newMatch = {
      team1: FirstCountry,
      team2: secondCountry,
      stadium: Stadiums,
      date: match_date,
      time: "time",
      lineman1: FirstLinesman,
      lineman2: SecondLinesman,
      referee: MainReferee,
    };
    // console.log(newMatch);

    const { data } = await axios.post(`${Route_}matches/addmatch`, newMatch, {
      validateStatus: false,
    });
    // .catch(function (error) {
    //   console.log(error.response.data); // this is the part you need that catches 400 request
    //   // setErrMsg("User does not exist");
    // });
    console.log(data);
  };

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          {/*--------------------Errors------------------------ */}
          <p ref={errRef} className={errMsg ? style_.errMsg : style_.offscreen}>
            {errMsg}
          </p>
          {/*--------------------Match part------------------------ */}
          <input
            type={"text"}
            placeholder="First country"
            onChange={(e) => setFirstCountry(e.target.value)}
            value={FirstCountry}
          ></input>
          <br />
          <br />
          <input
            type={"text"}
            placeholder="Second country"
            onChange={(e) => setSecondCountry(e.target.value)}
            value={secondCountry}
          ></input>
          <br />
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
          {/*--------------------second Linesmen------------------------ */}
          <br />
          <button onClick={handleClick}>Add Match</button>
        </div>
      </div>
    </div>
  );
}
