import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Header } from "./app/components/Header";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./app/utilities/routes/Routing";

function App() {
  return (
    <div className="container-fluid">
        <BrowserRouter>
          <Header/>
          <Routing/>
        </BrowserRouter>
    </div>
  );
}

export default App;
