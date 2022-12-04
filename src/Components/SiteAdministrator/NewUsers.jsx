import React from "react";

//used components
import Navbar from "./Navbar";

//used styles
import style_ from "./Admin.module.css";

export default function NewUsers() {
  let user = {
    name_: "yousef alaa",
    userName: "yousef_332",
    email: "yousef@gmail.com",
    BirthDate: "10/9/2000",
    Gender: "male",
    Nationality: "Egypt",
  };
  let arr = [1, 1, 1, 1, , 1, 1, 1, 1, 1];
  return (
    <div className={style_.mainContainer}>
      <Navbar />
      <table style={{ width: "100%" }}>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>BirthDate</th>
          <th>Gender</th>
          <th>Nationality</th>
          <th>approve authority</th>
        </tr>

        {arr.map((value, index) => {
          return (
            <tr key={index}>
              <td>{user.name_}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.BirthDate}</td>
              <td>{user.Gender}</td>
              <td>{user.Nationality}</td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <button type="button" class="btn btn-success">
                  Accept
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
