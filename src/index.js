//npm install --save modulename --legacy-peer-deps
//"start": "react-scripts start",

import React, {useState} from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing/pricing"
import Input from "./pages/InputPage/Input";
import NoPage from "./pages/NotFound/NotFound";
import Procedure from "./pages/Procedure/procedure";
import PatientInput from "./pages/PatientInput/PatientInput"
import Navbar from './components/faiz/Navbar/Navbar';
import Sidebar from "./components/faiz/Sidebar/Sidebar";
import axios from 'axios';

axios.defaults.baseURL = 'https://justhealth.herokuapp.com/';


export default function App() {
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };
  return (
    <>
      <Navbar toggle={toggle} />
      <Sidebar isopen={isopen} toggle={toggle} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/Patient Input" element={<PatientInput />} />
        <Route path="/Pricing/*" element={<Pricing />} />
        <Route path="/Procedure/*" element={<Procedure />}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// const theme = createTheme({
//   palette: {
//     primary: {
//       main:'#14A800'
//     },
//     secondary: {
//       main:'#1D4354'
//     }
//   },
// });

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();