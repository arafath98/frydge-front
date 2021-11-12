import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Contex } from "./Contex";

import Login from "./pages/Auth/Login";
import NotFound from './pages/NotFound/NotFound';

import './App.css';

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

          <Route path="/" element={<Login />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Contex.Provider>
    </div >
  );
}

export default App;
