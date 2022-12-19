import "./App.css";

/* import components */
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Guests/Home";
import AllUsers from "./Components/SiteAdministrator/AllUsers";
import NewUsers from "./Components/SiteAdministrator/NewUsers";
// manager
import MatchesDetails from "./Components/Managers/MatchesDetails";
import EditMatches from "./Components/Managers/EditMatches";
import AddStadium from "./Components/Managers/AddStadium";
import AddMatch from "./Components/Managers/AddMatch";
import VacantAndReservedSeats from "./Components/Managers/VacantAndReservedSeats";

// import react router
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allUsers" element={<AllUsers />} />
        <Route path="/newusers" element={<NewUsers />} />
        {/* manager */}
        <Route path="/MatchesDetails" element={<MatchesDetails />} />
        <Route path="/EditMatches" element={<EditMatches />} />
        <Route path="/AddStadium" element={<AddStadium />} />
        <Route path="/AddMatch" element={<AddMatch />} />
        <Route
          path="/VacantAndReservedSeats"
          element={<VacantAndReservedSeats />}
        />
      </Routes>
    </div>
  );
}

export default App;
