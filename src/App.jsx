import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./component/layout/Header.jsx";
import Home from "./pages/Home.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Home />
        {/* ...other components */}
      </div>
    </Router>
  );
}

export default App;
