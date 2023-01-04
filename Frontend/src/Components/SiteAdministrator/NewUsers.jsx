import React, { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

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

  const [pendingusers, setPendingUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}user/pendingusers
      `);
      console.log(data);
      setPendingUsers(data);
    })();
  }, []);

  if (pendingusers != undefined) {
    return (
      <div className={style_.mainContainer}>
        <Navbar />
        <table style={{ width: "100%" }}>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>BirthDate</th>
            <th>Gender</th>
            <th>Nationality</th>
            <th>approve authority</th>
          </tr>

          {pendingusers.map((value, index) => {
            return (
              <tr key={index}>
                <td>{`${value.firstName} ${value.lastName}`}</td>
                <td>{value.username}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>{user.BirthDate}</td>
                <td>{user.Gender}</td>
                <td>{user.Nationality}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={async () => {
                      console.log(value.username);
                      const { data } = await axios
                        .patch(`${Route_}user/approveuser/${value.username}`)
                        .catch(function (error) {
                          console.log(error.response.data); // this is the part you need that catches 400 request
                          alert(error.response.data);
                        });
                      // let { data2 } = await axios.get(
                      //   `${Route_}user/pendingusers`
                      // );
                      // setPendingUsers(data2);
                      console.log(data);
                    }}
                  >
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
}
