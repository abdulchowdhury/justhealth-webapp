import Axios from 'axios';
import Graph from '../../components/Graph';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState} from 'react';


const Procedure = (props) => {

  const [data, setData] = useState("no data")
  const [crowdsourced, setCrowdsourced] = useState("no data")

  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("pid")
  const hospital = searchParams.get("hospital")
  const b = [];

  //currently don't use these in the query, but could later
  const insurance = searchParams.get("insurance")
  const zip = searchParams.get("zip")

  const price = data[0].Charge;


  useEffect(() => {
    queryOnLoad();
  }, []);

  const queryOnLoad = () => {
    let url = "http://localhost:3002/api/"
    url += hospital
    Axios.post(url, {}, {
        params: {
          pid: pid
        }
      }).then((data)=>{
      setData(data.data.result)
    })
    Axios.post("http://localhost:3002/api/getCrowdsourced", {}, {
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
      if(((item[1]).substring(0,1) !== '0') && item[0] !== "Charge" && item[0] !== "Payor_Rate_Max" && item[0] !== "Payor_Rate_Min" && item[0] !== "Procedure_Code") {
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
      if (b[x[0]] < 0) {
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
    alert("match")
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


  return (
    <body>
    <div>
      <h1>{data[0].Med_Procedure_Description} at {hospital}</h1>
        {/* 
        data like data.charge are prices, but are strings with symbols like '$' and ',' so for
        any calculations to take place, they have to be parsed specially
         */}

        <h2>Analytics:</h2>
        <p>Ticket Price: {price}</p>
        <p>Hopitals nearby prices here</p>
        <p>Cost timeline here</p>
        <p>Average Cost reported by users: {getCAvg()}</p>
        <h3>Average Cost: {dollar.format(avgCost)}</h3>
        <p>Note: If insurance is not listed, it does not cover this procedure.</p>
        <Graph b={b} insurance={insurance}/>
        
    </div>
    </body>
  )
};

Procedure.defaultProps = {
    pName: "Default"
}

export default Procedure