import { Outlet, Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";

const Input = () => {
  return (
    <div>
      <form action="/">
        <h1>Previous Procedure Input Form</h1>
        <h4>Type of Procedure<span>*</span></h4>
        <input class="name" type="text" name="name" placeholder="First" />
        <h4>Total Accrued Costs<span>*</span></h4>
        <input type="text" name="name" />
        <h4>Procedure Hospital<span>*</span></h4>
        <input type="text" name="name"/>
        <h4>Procedure Data</h4>
        <input type="text" name="name"/>
        <h4>Insurance Provider</h4>
        <input type="text" name="name"/>
        <div class="btn-block">
          <button type="submit" href="/">Submit</button>
        </div>
      </form>
    </div>
    
  )
  };
  
  export default Input;