import Button from '@mui/material/Button'

const Input = () => {
  return (
    <div>
      <form action="/">
        <h1>Previous Procedure Input Form</h1>
        <label for="procedure"><h4>Type of Procedure</h4></label>
        <input id="procedure" type="text" name="procedure" />
        <label for="costs"><h4>Total Accrued Costs</h4></label>
        <input id="costs" type="text" name="costs" />
        <label for="hospital"><h4>Procedure Hospital</h4></label>
        <input id = "hospital" type="text" name="hospital"/>
        <label for="date"><h4>Procedure Date</h4></label>
        <input id="date" type="date" name="date"/>
        <label><h4>Insurance Provider</h4></label>
        <input id="insurance" type="text" name="insurance"/>
        <div class="btn-block">
          
          <Button type = "submit" href = "/" color = "primary" variant='contained' sx={{ mt:4}}>Submit</Button>
        </div>
      </form>
    </div>
    
  )
  };
  
  export default Input;