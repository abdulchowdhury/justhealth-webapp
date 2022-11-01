
import Axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const Procedure = (props) => {

  const [data, setData] = useState("no data")

  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("pid")

  //currently don't use these in the query, but could later
  const insurance = searchParams.get("insurance")
  const zip = searchParams.get("zip")

  useEffect(() => {
    queryOnLoad();
  }, []);

  const queryOnLoad = () => {
    Axios.post("http://localhost:3002/api/spsh", {}, {
        params: {
          pid: pid
        }
      }).then((data)=>{
      console.log(data)
      setData(data.data.result)
    })
  }

  return (
    <div>
        <h1>{data[0].Med_Procedure_Description}: {data[0].Charge}</h1>
        {/* 
        data like data.charge are prices, but are strings with symbols like '$' and ',' so for
        any calculations to take place, they have to be parsed specially
         */}

        <p>Analytics:</p>
        <p>Hopitals nearby prices here</p>
        <p>Cost timeline here</p>
        <p>avg cost here</p>
        <p>box plot cost comparisons between insurances at this hospital here</p>
    </div>
  )
};


Procedure.defaultProps = {
    pName: "Default"
}

export default Procedure;