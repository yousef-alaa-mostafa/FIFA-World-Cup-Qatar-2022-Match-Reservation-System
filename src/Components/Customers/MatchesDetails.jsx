import React from "react";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./MatchesDetails.module.css";

//import stadiums images
import AlJanoub_Stadium from "./stadiums/aljanoub-stadium.jpg";

export default function MatchesDetails() {
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

            {Matches.map((value, index) => {
              return (
                <div
                  key={index}
                  className="col-md-4 my-3"
                  id={style_.matchContainer}
                >
                  <div className="item" id={style_.movies}>
                    <img className="w-100" src={AlJanoub_Stadium}></img>
                    <ul>
                      <li>{match.team1 + " vs " + match.team2}</li>

                      <li>{"at " + match.second_Linesmen}</li>
                      <li>{"Date is " + match.date}</li>
                      <li>{"the main referee is " + match.Main_Referee}</li>
                      <li>
                        {"the Two Linesmen are " +
                          match.first_Linesmen +
                          " and " +
                          match.second_Linesmen}
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
