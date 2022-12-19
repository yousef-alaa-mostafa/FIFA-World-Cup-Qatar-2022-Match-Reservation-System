import React, { useState } from "react";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./AddStadium.module.css";

export default function AddStadium() {
  const [StadiumName, setStadiumName] = useState("");
  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          {/*--------------------stadium part------------------------ */}
          <input
            type={"text"}
            placeholder="Stadium name"
            onChange={(data) => {
              setStadiumName(data);
            }}
          ></input>
          <br />
          <br />
          {/*--------------------stadium part------------------------ */}
          <input type="file" />
          <br />
        </div>
      </div>
    </div>
  );
}
