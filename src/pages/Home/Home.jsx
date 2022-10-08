import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <h1> Home </h1>
      <ResponsiveAppBar></ResponsiveAppBar>
    </div>
    
  )
  };
  
  export default Home;