import React from "react";

//used components
import Navbar from "./Navbar";

//used styles
import style_ from "./Newusers.module.css";

export default function NewUsers() {
  return (
    <div className={style_.mainContainer}>
      <Navbar />
      new users
    </div>
  );
}
