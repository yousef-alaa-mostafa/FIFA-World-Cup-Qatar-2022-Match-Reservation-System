import React, { useState, useRef } from "react";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./AddStadium.module.css";

export default function AddStadium() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [StadiumName, setStadiumName] = useState("");
  const [StadiumImage, setStadiumImage] = useState("");

  const handleClick = () => {
    setErrMsg("Not complete");
  };

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        <div className={style_.innerHolder}>
          {/*-------------------- Errors ------------------------ */}
          <p ref={errRef} className={errMsg ? style_.errMsg : style_.offscreen}>
            {errMsg}
          </p>
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
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(data) => {
              setStadiumName(data);
            }}
          />
          <br />
          {/*--------------------second Linesmen------------------------ */}
          <br />
          <button onClick={handleClick}>Add Stadium</button>
        </div>
      </div>
    </div>
  );
}
