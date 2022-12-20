// import React from "react";

// export default function CusHome() {
//   return <div>customer home</div>;
// }

import React from "react";

class TicketReservationForm extends React.Component {
  state = {
    match: "",
    ticketType: "standard",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Send reservation request to server here
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>2022 World Cup Ticket Reservations</h1>
        <p>
          Welcome to the official 2022 World Cup ticket reservation system.
          Please select your desired match and ticket type below:
        </p>
        <label htmlFor="match">Match:</label>
        <select
          id="match"
          name="match"
          value={this.state.match}
          onChange={this.handleChange}
        >
          <option value="match1">Match 1</option>
          <option value="match2">Match 2</option>
          <option value="match3">Match 3</option>
        </select>
        <br />
        <label htmlFor="ticket-type">Ticket Type:</label>
        <br />
        <input
          type="radio"
          id="ticket-type-standard"
          name="ticket-type"
          value="standard"
          checked={this.state.ticketType === "standard"}
          onChange={this.handleChange}
        />
        <label htmlFor="ticket-type-standard">Standard</label>
        <br />
        <input
          type="radio"
          id="ticket-type-premium"
          name="ticket-type"
          value="premium"
          checked={this.state.ticketType === "premium"}
          onChange={this.handleChange}
        />
        <label htmlFor="ticket-type-premium">Premium</label>
        <br />
        <button type="submit">Reserve Tickets</button>
      </form>
    );
  }
}

export default TicketReservationForm;
