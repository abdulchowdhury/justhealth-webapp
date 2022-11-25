import React from 'react';
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
import NoPage from "./pages/NoPage";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import Procedure from "./pages/Procedure/procedure";
import HireUs from "./pages/HireUs/HireUs"

export default function App() {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/Crowdsource" element={<HireUs />} />
        <Route path="/Pricing/*" element={<Pricing />} />
        <Route path="/Procedure/*" element={<Procedure />}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
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
      <CssBaseline />
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();