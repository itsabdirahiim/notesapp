import React from "react";
import Signup from "./com/signup";
import Home from "./com/home";
import Login from "./com/login";
// import { Hompr } from "./com/homepr";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
