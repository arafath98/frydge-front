import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Contex } from "./Contex";

import Login from "./pages/Auth/Login";
import NotFound from './pages/NotFound/NotFound';

import './App.css';
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import Scanner from "./pages/Home/Scanner";

function App() {

  const [theme, setTheme] = useState("dark");

  const colours = {
    dark: {
      primary: "#18191a",
      secondary: "#242526",
      secondaryHover: "##505151",

      contrast: "#2d88ff",
      contrastHover: "#4e9afd",

      text: "black",
      contrastTextColor: "white"
    }
  }

  return (
    <div className="App">
      <Contex.Provider value={{ theme, setTheme, colours }} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<Scanner/>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Contex.Provider>
    </div >
  );
}

export default App;
