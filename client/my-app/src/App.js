import React from "react";
import Signup from "./com/signup";
import Home from "./com/home";
import Login from "./com/login";
// import { Hompr } from "./com/homepr";
import { HashRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
