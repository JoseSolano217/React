import React from 'react';
import './App.css';

import { Header } from "./app/components/Header";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./app/routes/Routing";

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
