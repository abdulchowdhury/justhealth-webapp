import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const Home = () => {
  return (
    <div>
      



      <div className="Parent">

        <div className="MissionStatment">
          
          <h1> better prices, better care</h1>
          <h2> because we're just one step closer to <h2> justhealth </h2> </h2>

          {/* search bar for procedures ---- dropbpx for insurance provdier
              number input for zipcode
              search button */}
          
            <Autocomplete
            freeSolo
            id="procedure-search"
            disableClearable
            
            renderInput={(params) => (
            <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
            <form>
            <label for="procedure">Procedure: </label>
            <input type="text" id="procedure" name="procedure"></input> <br/>

            <label for="insurance">Insurance - change to set options later: </label>
            <input type="text" id="insurance" name="insurance"></input> <br/>

            <label for="zip">Zip Code: </label>
            <input type="text" id="zip" name="zip"></input> <br/>

            <button type="submit">Search</button>
          </form>



        </div>

      </div>
      
    </div>
    
  )
  };
  
  export default Home;