import React from "react";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/settings/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
        <TopBar />
        <Routes>
          <Route path="/" exact element={<Home></Home>}></Route> 
          <Route path="/register" element={user ? <Home/> : <Register />} ></Route>
          <Route path="/login" element={user ? <Home/> : <Login />} ></Route>
          <Route path="/about" element={user ? <About/> : <Register />} ></Route>
          <Route path="/contact" element={user ? <Contact/> : <Register />} ></Route>
          <Route path="/write" element={user ? <Write /> : <Register />} ></Route>
          <Route path="/settings" element={user ? <Setting /> : <Register/>} ></Route>
          <Route path="/post/:postId" element={<Single />} ></Route> 
        </Routes>
      </Router>
  );
}

export default App;
