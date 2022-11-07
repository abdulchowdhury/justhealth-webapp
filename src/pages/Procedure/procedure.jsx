
import Axios from 'axios';
import Graph from '../../components/Graph';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState} from 'react';
import { forEach, number, parse } from 'mathjs';
import { avatarGroupClasses, ListItemAvatar } from '@mui/material';


const Procedure = (props) => {

  const [data, setData] = useState("no data")

  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("pid")
  const b = [];

  //currently don't use these in the query, but could later
  const insurance = searchParams.get("insurance")
  const zip = searchParams.get("zip")
  const price = data[0].Charge;



  useEffect(() => {
    queryOnLoad();
  }, []);

  const queryOnLoad = () => {
    Axios.post("http://localhost:3002/api/spsh", {}, {
        params: {
          pid: pid
        }
      }).then((data)=>{
      setData(data.data.result)
    })
  }

  function set(item) { // takes data and only finds prices and takes out $ and takes out the prices that are $0
    if (typeof(item[1]) === 'string' && item[1].substring(0,1) === '$') {
      if((item[1]).substring(1,2) !== '0' && item[0] !== "Charge") {
        const index = item[0].indexOf('_');
        b[(item[0]).substring(0,index)] = (item[1]).substring(1);
      } if (item[0] === "Charge") {
        numPrice = parseFloat(((item[1]).substring(1)).replace(/,/g, ''));;
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
  Object.entries(b).forEach(change); // loops through to get difference between cost and coverage


  Object.values(b).forEach(avg); // loops through for average
  var avgCost = sum/count;


  
  let dollar = Intl.NumberFormat('en-US'); //currency format for cost


  return (
    <body>
    <div>
      <h1>{data[0].Med_Procedure_Description}: {price}</h1>
        {/* 
        data like data.charge are prices, but are strings with symbols like '$' and ',' so for
        any calculations to take place, they have to be parsed specially
         */}

        <h2>Analytics:</h2>
        <p>Hopitals nearby prices here</p>
        <p>Cost timeline here</p>
        <h3>Average Cost: {'$' + dollar.format(avgCost)}</h3>
        <Graph b={b}/>
        
    </div>
    </body>
  )
};

Procedure.defaultProps = {
    pName: "Default"
}

export default Procedure;