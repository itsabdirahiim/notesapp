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
          <Route path="https://notesapp-505-app-eacf6219a989.herokuapp.com/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="https://notesapp-505-app-eacf6219a989.herokuapp.com/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
