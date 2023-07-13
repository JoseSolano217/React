import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { MainHeader } from "./app/components/Header";
import { BrowserRouter } from "react-router-dom";
import { Body } from "./app/components/Body";

function App() {

  return (
    <div className="container-fluid">
        <BrowserRouter>
          <MainHeader/>
          <Body/>
        </BrowserRouter>
    </div>
  );
}

export default App;
