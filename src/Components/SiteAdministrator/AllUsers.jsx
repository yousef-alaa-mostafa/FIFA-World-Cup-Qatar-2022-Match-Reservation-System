import React from "react";

//used components
import Navbar from "./Navbar";

//used styles
import style_ from "./AllUsers.module.css";

export default function AllUsers() {
  return (
    <div className={style_.mainContainer}>
      <Navbar />
      All users
    </div>
  );
}
