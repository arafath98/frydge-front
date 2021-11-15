import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./Context";

import Login from "./pages/Auth/Login";
import NotFound from './pages/NotFound/NotFound';
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import NavBar from "./components/Nav/NavBar";
import Profile from "./pages/Profile/Profile";

import './App.css';
import Scanner from "./pages/Home/Scanner";

function App() {

  const [itemsData, setItemsData] = useState([]);
  const [username, setUsername] = useState("");

  const validateToken = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      return true;
    }

    return false;
  }

  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(validateToken());

  const colors = {
    dark: {
      primary: "#18191a",
      secondary: "#242526",
      secondaryHover: "#505151",

      contrast: "#2d88ff",
      contrastHover: "#4e9afd",

      text: "white",
      contrastTextColor: "white"
    }
  }

  return (
    <div className="App" style={{ backgroundColor: colors[theme].primary, color: colors[theme].text }}>
      <Context.Provider value={{ theme, setTheme, colors, isLoggedIn, setIsLoggedIn, itemsData, setItemsData }} >
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>HOME</h1>} />

          <Route path="/home" element={<Home />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/scanner" element={<Scanner />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes >
      </Context.Provider >
    </div >
  );
}

export default App;
