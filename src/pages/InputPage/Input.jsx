import Button from '@mui/material/Button'
import { useState } from 'react';

const Input = () => {
  const [procedure, setProcedure] = useState("");
  const [insurance, setInsurance] = useState("");
  const [cost, setCost] = useState(0.0);
  const [date, setDate] = useState("");
  const [hospital, setHospital] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`
     procedure: ${procedure}\n
     cost: ${cost}\n 
     hospital: ${hospital}\n
     date: ${date}\n
     insurance: ${insurance}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter your medical costs here!</h1>

        <label for="procedure"><h4>Type of Procedure</h4>
          <input onChange={(e)=>setProcedure(e.target.value)} id="procedure" type="text" name="procedure" />
        </label>
        
        <label for="costs"><h4>Total Accrued Costs</h4>
          <input onChange={(e)=>setCost(e.target.value)} id="costs" type="text" name="costs" />
        </label>
        
        <label for="hospital"><h4>Procedure Hospital</h4>
          <input onChange={(e)=>setHospital(e.target.value)} id = "hospital" type="text" name="hospital"/>
        </label>

        <label for="date"><h4>Procedure Date</h4>
          <input onChange={(e)=>setDate(e.target.value)} id="date" type="date" name="date"/>
        </label>
        
        <label for="insurance"><h4>Insurance Provider</h4>
          <input onChange={(e)=>setInsurance(e.target.value)} id="insurance" type="text" name="insurance"/>
        </label>
        
        <div class="btn-block">
          
          <Button type = "submit" color = "primary" variant='contained' sx={{ mt:4}}>Submit</Button>
        </div>
      </form>
    </div>
    
  )
  };
  
  export default Input;