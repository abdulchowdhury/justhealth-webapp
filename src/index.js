import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing/pricing"
import Input from "./pages/InputPage/Input";
import NoPage from "./pages/NoPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Procedure from "./pages/Procedure/procedure";
import HireUs from "./pages/HireUs/HireUs";
import Course from "./pages/Course/Course";
import HomeNew from "./pages/HomeNew/HomeNew";

export default function App() {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <BrowserRouter>
      <Routes>
        <Route index element={<HomeNew />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Procedure/*" element={<Procedure />}/>
        <Route path="/Crowdsource" element={<HireUs />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/HomeNew" element={<HomeNew />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
