import "./App.css";

/* import components */
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Guests/Home";
import AllUsers from "./Components/SiteAdministrator/AllUsers";
import NewUsers from "./Components/SiteAdministrator/NewUsers";

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
      </Routes>
    </div>
  );
}

export default App;
