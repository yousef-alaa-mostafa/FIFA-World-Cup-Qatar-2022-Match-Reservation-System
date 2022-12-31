import React from "react";
import { useState } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used styles
import style_ from "./Customer.module.css";

// used components
import Navbar from "./Navbar";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

//import date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import coutry picker
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

export default function EditData() {
  const [First_name, set_First_name] = useState();
  const [Second_name, set_Second_name] = useState();
  const [PWD, setPWD] = useState("");

  const [Role, setRole] = useState("");
  const roleOptions = ["Manager", "Admin", "Fan"];

  const [Birth_Date, set_Birth_Date] = useState(new Date());
  const [day_, setDay_] = useState();
  const [month_, setmonth_] = useState();
  const [year, setyear] = useState();

  const [Nationality, setNationality] = useState("");

  const [Gender, setGender] = useState("");
  const genderOptions = ["Male", "Female"];

  const HandleClick = async () => {
    let username = localStorage.getItem("username");
    let bd = "";
    if (year && month_ && day_) {
      bd = year + "/" + month_ + "/" + day_;
    }
    let user = {
      firstName: First_name,
      lastName: Second_name,
      password: PWD,
      role: Role,
      birthdate: bd,
      // nationality: Nationality,
      // gender: Gender,
    };

    const { data } = await axios.patch(
      `${Route_}user/updateuser/${username}`,
      user
    );

    console.log(data);
  };

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.inner}>
          <div>Fill only the inputs you want to edit</div>

          <br />
          <input
            className={style_.input}
            placeholder="Enter Your First Name"
            type={"text"}
            onChange={(e) => set_First_name(e.target.value)}
            value={First_name}
          />
          <br />
          <br />
          <input
            className={style_.input}
            placeholder="Enter Your Second Name"
            type={"text"}
            autoComplete="new-off"
            onChange={(e) => set_Second_name(e.target.value)}
            value={Second_name}
          />

          <br />
          <br />
          <input
            className={style_.input}
            placeholder="Enter Your Password"
            type={"password"}
            autoComplete="new-password"
            onChange={(e) => setPWD(e.target.value)}
            value={PWD}
          />
          {/*--------------------role part------------------------ */}
          <br />
          <br />
          <Dropdown
            options={roleOptions}
            onChange={(data) => {
              setRole(data.value);
            }}
            placeholder="Role"
          />
          {/*--------------------birthdate part------------------------ */}
          <label>Birth Date:</label>
          <DatePicker
            selected={Birth_Date}
            onChange={(date) => {
              set_Birth_Date(date);
              setDay_(date.getDate());
              setyear(date.getFullYear());
              setmonth_(date.getMonth() + 1);
            }}
          />
          {/*--------------------nationality part------------------------ */}
          <br />
          <br />
          <CountryDropdown
            style={{ height: "40px", width: "350px" }}
            value={Nationality}
            onChange={(data) => setNationality(data)}
          />

          {/*--------------------gender part------------------------ */}
          <br />
          <br />
          <Dropdown
            options={genderOptions}
            onChange={(data) => {
              setGender(data.value);
            }}
            placeholder="Gender"
          />
          <button onClick={HandleClick}>Update Data</button>
        </div>
      </div>
    </div>
  );
}
