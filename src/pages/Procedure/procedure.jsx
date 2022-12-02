import Axios from 'axios';
import Graph from '../../components/Graph';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState} from 'react';
import infoBubble from '../Pricing/infoBubble';
import Grid from '@mui/material/Grid';


const Procedure = (props) => {

  const [data, setData] = useState("no data")
  const [crowdsourced, setCrowdsourced] = useState("no data")

  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("pid")
  const hospital = searchParams.get("hospital")
  const b = [];

  //currently don't use zip in the query, but could later
  const insurance = searchParams.get("insurance")
  const zip = searchParams.get("zip")

  const price = data[0].Charge;


  useEffect(() => {
    queryOnLoad();
  }, []);

  const queryOnLoad = () => {
    let url = "api/"
    url += hospital
    Axios.post(url, {}, {
        params: {
          pid: pid
        }
      }).then((data)=>{
      setData(data.data.result)
    })
    Axios.post("api/getCrowdsourced", {}, {
        params: {
          pid: pid
        }
      }).then((data)=>{
      setCrowdsourced(data.data.result)
    })
  }

  function isNum(c) { // checks if digit is num
    return c >= '0' && c <= '9';
  }

  function set(item) { // takes data and only finds prices and takes out $ and takes out the prices that are $0
    if (typeof(item[1]) === 'string' && isNum(item[1].substring(0,1))) {
      if(((item[1]).substring(0,1) !== '0') && item[0] !== "Charge" && item[0] !== "Payor_Rate_Max" && item[0] !== "Payor_Rate_Min" && item[0] !== "Procedure_Code"  && item[0] !== "Med_Procedure_Description") {
        const name = (item[0].replace(/_/g," "));
        if (name !== null || name !== "") {
          b[name] = item[1];
        }
      } if (item[0] === "Charge") {
        numPrice = item[1];
      }
    }
  }

  function num(p) { // takes string and replaces it with float type (parses string)
    var x = p[1];
    p[1] = parseFloat(x.replace(/,/g, ''));
    if (p[1] === 0) {
      delete b[p[0]];
    }
    b[p[0]] = p[1];
  }

  var numPrice;
  function change(x) { // takes insurance coverage and subtracts from charge
      b[x[0]] = (numPrice - x[1]);
      if (b[x[0]] <= 0) {
        delete b[x[0]];
        b[x[0] + ' (fully covered)'] = 0.00;
      }
  }

  var sum = 0.0;
  var count = 0;
  function avg(x) { // finds average
    sum = sum + x;
    count++;
  }
  Object.entries(data[0]).forEach(set); // loops through for data formating
  Object.entries(b).forEach(num); // loops through to make float
  // console.log(Object.entries(data[0]));
  // console.log(Object.entries(b));
  Object.entries(b).forEach(change); // loops through to get difference between cost and coverage

  if (Object.keys(b).includes(insurance)) {
    //alert("match")
  }

  Object.values(b).forEach(avg); // loops through for average
  var avgCost = (sum/count)
  let formatting_options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
 }
  let dollar = Intl.NumberFormat('en-US', formatting_options); //currency format for cost
  function getCAvg() {
    let c_avg = "No crowdsourced data."
    if (crowdsourced.length !== 0) {
      var c_total = 0
      for (var i = 0; i < crowdsourced.length; i++) {
        c_total += parseFloat(crowdsourced[i].cost)
      }
      c_avg = c_total/i
      return dollar.format(c_avg)
    }
    return c_avg
  }

  function getBest() {
    let min = Number.MAX_VALUE;
    let cash = 0;
    let found = false
    Object.entries(b).forEach(([key, value], index) => {
      if (insurance !== "" && insurance !== null && insurance !== " " && insurance !== "." && ((key.toUpperCase().indexOf(insurance.toUpperCase())) !== -1)) {
        found = true;
        min = Math.min(min, value)
      } else if (key === "Cash Discount") {
        cash = value;
      }
    });
    if (found) {
      return (!(min < cash));
    } else {
      return false;
    }
    
  }


  return (
    <body>
    <div style={{margin:15}}>
      <center>
      <Grid
      container
      spacing={2}
      >
        <Grid item xs = {2}></Grid> {/**These empty grid cells are for padding */}
        <Grid item xs = {8}>
          <h1>{data[0].Med_Procedure_Description} at {hospital}</h1>
          <p fontWeight = {900}>Procedure Code: {pid}</p>
        </Grid>
        <Grid item xs = {2}></Grid> {/**These empty grid cells are for padding */}

        <Grid item xs = {4}>
          <p>Ticket Price<br></br> {dollar.format(price)} {infoBubble("What is a ticket price?", "The default, total cost of a procedure before any insurance reiembursements or cash discounts.")}</p>
        </Grid>
        <Grid item xs = {4}>
          <h3>Average Cost<br></br> {dollar.format(avgCost)} {infoBubble("How was this calculated?","We calculate the average cost using only the prices from insurances that actually cover this procedure and the cash price.")}</h3>
        </Grid>
        <Grid item xs = {4}>
          <p>Crowdsourced Average<br></br> {getCAvg()} {infoBubble("How was this calculated?", "Currently, crowdsourced averages are calculated using user-inputted data across all hospitals and insurances for this procedure.")}</p>
        </Grid>
        {getBest() ? (<Grid item xs = {12} alignContent = 'center'>
          <h3><br></br> {"Paying with cash might be better for this procedure"}</h3>
        </Grid>) : "" }
        <Grid item xs = {12}>
          <Graph b={b} insurance={insurance}/>
        </Grid>
        <Grid itme xs = {12} sx={{
                my: 2,
                mr: 3,
                color: '#141414',
                display: 'block',
                textTransform: 'none',
                fontWeight: 900,
              }}>
          <h2 style={{fontWeight: 800, fontSize: 30}}>Additional Infomation</h2>
          <div style={{padding: 3}}></div>
          <p style={{fontWeight: 600, fontSize: 17}}>Where's my insurance on this graph?</p>
          <p style={{fontWeight: 500, fontSize: 15}}>If your insurance is not listed, it does not cover this procedure, otherwise your insurance provider's price is highlighted. <br></br>If you did not input an insurance, then the amount you would pay in cash is highlighted.</p>
          <div style={{padding: 3}}></div>
          <p style={{fontWeight: 600, fontSize: 17}}>What is Cash Discount?</p>
          <p style={{fontWeight: 500, fontSize: 15}}>Cash Discount is the amount you would pay if you don't use any insurance.</p>
          <div style={{padding: 3}}></div>
          <p style={{fontWeight: 600, fontSize: 17}}>Where does this data come from?</p>
          <p style={{fontWeight: 500, fontSize: 15}}>Data was pulled directly from the pricing data this hospital released to comply with the Hospital Transparency Act of 2021.</p>
        </Grid>
      </Grid>
      </center>
    </div>
    </body>
  )
};

Procedure.defaultProps = {
    pName: "Default"
}

export default Procedure