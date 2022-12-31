import React from "react";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

//API route
import { Route_ } from "../Route";

// used components
import Navbar from "./Navbar.jsx";

// used styles
import style_ from "./Customer.module.css";

//import dropdown
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function VacantSeats() {
  const successRef = useRef();
  const errRef = useRef();

  const opacity_ = ["1", "0.5"];
  const color_ = ["#00A300", "#A30000"];
  const status = ["Vacant", "Reserved"];

  const [errMsg, setErrMsg] = useState("");
  const [chosenMatch, setChosenMatch] = useState("");
  const [MatchSeats, setMatchSeats] = useState([]);
  const [Matches, setMatches] = useState([]);

  const [CCN, setCCN] = useState("");
  const [PIN_, setPIN_] = useState("");

  const [ReservedSeates, setReservedSeates] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [ReservedSeatesIDs, setReservedSeatesIDs] = useState([]);

  const [successMsg, setSuccessMsg] = useState("");

  const [page, setPage] = useState(0);

  const ReserveFun = async () => {
    let reservationData = {
      username: localStorage.getItem("username"),
      match_id: chosenMatch,
      seatNumber: ReservedSeatesIDs,
      creditCardNumber: CCN,
      creditPinNumber: PIN_,
    };

    if (CCN.length === 0 || PIN_.length === 0) {
      setErrMsg("Enter your credit number and pin number");
    } else {
      const { data } = await axios.post(
        `${Route_}reservations/reserve/${localStorage.getItem(
          "username"
        )}/${chosenMatch}`,
        reservationData,
        { validateStatus: false }
      );
      if (data.messege === "Ticket reserved") {
        setSuccessMsg(data.messege);
        setErrMsg("");
      } else {
        setErrMsg(data.messege);
        setSuccessMsg("");
      }
      console.log(data);
      alert("reserved successfully");
      // setPage(0);
      window.open("/customer/vacant seats", "_self");
    }
  };

  const GotoRservation = () => {
    setPage(1);
  };

  // get the mathches
  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${Route_}matches`);
      console.log(data);
      let temp_matches = [];
      let temp_matches_with_id = [{ key: "key", value: "value" }];
      for (let i = 0; i < data.length; i++) {
        temp_matches[i] =
          data[i].team1 + " and " + data[i].team2 + " /" + data[i]._id;
      }
      setMatches(temp_matches);
    })();
    console.log(localStorage.getItem("username"));
    setMatchSeats([]);
  }, []);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(
        `${Route_}matches/reservedseats/${chosenMatch}`
      );
      setMatchSeats(data);
      console.log(data);
    })();
  }, [chosenMatch]);

  return (
    <div className={style_.main_Container}>
      <Navbar />
      <div className={style_.setterHolder}>
        {page === 0 ? (
          <>
            <div className={style_.innerHolder}>
              <br />
              <div style={{ width: "500px" }}>
                <Dropdown
                  options={Matches}
                  onChange={(data) => {
                    setChosenMatch(data.value.split("/")[1]);
                  }}
                  placeholder="Select Match"
                />
              </div>
              {/* <button
                type="button"
                class="btn btn-primary"
                onClick={handleClick}
              >
                Show vacant seats for the selected match
              </button> */}
              {/*-------------------- successful ------------------------ */}
              <br />
              <br />
              <p
                ref={successRef}
                className={successMsg ? style_.successMsg : style_.offscreen}
              >
                {successMsg}
              </p>
              <button
                type="button"
                class="btn btn-primary"
                disabled={successMsg.length === 0 ? true : false}
                style={{ display: successMsg.length === 0 ? "none" : "" }}
                onClick={GotoRservation}
              >
                Click to rserve selected seates
              </button>
              <div
                className="container my-5"
                style={{ margin: "0px !important" }}
              >
                <div className="row">
                  {MatchSeats.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className="col-md-2 my-3 "
                        id={style_.matchContainer}
                      >
                        <div className="item" id={style_.movies}>
                          <div
                            className={style_.seat}
                            style={{
                              backgroundColor: color_[value],
                              opacity: opacity_[ReservedSeates[index]],
                            }}
                            onClick={() => {
                              if (
                                MatchSeats[index] === 0 &&
                                ReservedSeates[index] === 0
                              ) {
                                if (
                                  ReservedSeates.find((element) => {
                                    return element === 1;
                                  })
                                ) {
                                  setSuccessMsg(successMsg + ", " + index);
                                } else {
                                  setSuccessMsg(
                                    successMsg +
                                      "Your Reserved Seates Are: " +
                                      index
                                  );
                                }
                                let selectedSeate = ReservedSeates;
                                selectedSeate[index] = 1;
                                setReservedSeates(selectedSeate);

                                let selectedSeateID = ReservedSeatesIDs;
                                selectedSeateID.push(index);
                                setReservedSeatesIDs(selectedSeateID);

                                console.log(ReservedSeatesIDs);
                              }
                            }}
                          >
                            {index + " " + "(" + status[value] + ")"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={style_.inner}>
              {/*-------------------- Errors ------------------------ */}
              <p
                ref={errRef}
                className={errMsg ? style_.errMsg : style_.offscreen}
              >
                {errMsg}
              </p>
              <p
                ref={successRef}
                className={successMsg ? style_.successMsg : style_.offscreen}
              >
                {successMsg}
              </p>
              {/*-------------------------------------------- */}
              <br />
              <input
                className={style_.input}
                placeholder="Enter Your credit card number"
                onChange={(e) => setCCN(e.target.value)}
                value={CCN}
              />
              <br />
              <br />
              <input
                className={style_.input}
                placeholder="Enter pin number"
                onChange={(e) => setPIN_(e.target.value)}
                value={PIN_}
              />

              <br />
              {/*--------------------reserve ticket------------------------ */}
              <br />
              <button onClick={ReserveFun}>Reserve Seat</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
