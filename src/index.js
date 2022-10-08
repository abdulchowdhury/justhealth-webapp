import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing/pricing"
import NoPage from "./pages/NoPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

export default function App() {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
