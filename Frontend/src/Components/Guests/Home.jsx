import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./Home.module.css";

//import stadiums images
import AlJanoub_Stadium from "./stadiums/aljanoub-stadium.jpg";

//API route
import { Route_ } from "../Route";

export default function Home() {
  let match = {
    team1: "Saudi Arabia",
    team2: "Argentina",
    stadium: "Al Janoub Stadium",
    date: "10/5/2022",
    Main_Referee: "Fernando Rapallini",
    first_Linesmen: "Wilton Sampaio",
    second_Linesmen: "Daniel Siebert",
  };
  let Matches = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const [Matches_, setMatches] = useState();

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);
      setMatches(data);
    })();
  }, []);

  if (Matches_ != undefined) {
    console.log(Matches_);
    return (
      <div className={style_.main_Container}>
        <Navbar />
        <div>
          <div className="container my-5" style={{ margin: "0px !important" }}>
            <div className="row">
              <div className="col-md-4">
                <div className={style_.leftTrending}>
                  <hr className={style_.hr1} />
                  <h2>
                    All
                    <br />
                    Matches
                    <br />
                    Details to review
                  </h2>
                  <p>to reserve a ticket you shoud register</p>
                  <hr className={style_.hr2} />
                </div>
              </div>

              {Matches_.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="col-md-4 my-3"
                    id={style_.matchContainer}
                  >
                    <div className="item" id={style_.movies}>
                      <img className="w-100" src={value.stadium.image}></img>
                      <ul>
                        <li>{value.team1 + " vs " + value.team2}</li>

                        <li>{"at " + value.stadium.name}</li>
                        <li>{"Date is " + value.date}</li>
                        <li>{"the main referee is " + value.referee}</li>
                        <li>
                          {"the Two Linesmen are " +
                            value.lineman1 +
                            " and " +
                            value.lineman2}
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
