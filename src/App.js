import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing/pricing"
import Input from "./pages/InputPage/Input";
import NoPage from "./pages/NoPage";
import Navbar from "./components/Navbar/Navbar";
import Procedure from "./pages/Procedure/procedure";
import HireUs from "./pages/HireUs/HireUs";
import Course from "./pages/Course/Course";
import HomeNew from "./pages/HomeNew/HomeNew";
import Axios from 'axios';
import { index } from "mathjs";
import "./App.css";

// axios.defaults.baseURL = "https://www.justhealth.fyi/";
Axios.defaults.baseURL = "http://localhost:3002/";
function App() {
  return (
    <div >
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route index element={<HomeNew />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Procedure/*" element={<Procedure />}/>
        <Route path="/Patient Input" element={<HireUs />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/HomeNew" element={<HomeNew />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
