import { Opacity } from '@mui/icons-material';
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import { boltzmannDependencies } from 'mathjs';
import React, {Component} from 'react';
import Plotly from 'react-plotly.js';
import "./Graph.css"

class Graph extends Component {
  
    render() {
      function checker(arr) {
        if (((arr.toString().toUpperCase()).indexOf(insurance)) === -1) {
          insurance = "Cash Discount";
        }
      }
      
      function getColor(data) {
        insurance = insurance.toUpperCase();
        if (insurance === undefined || insurance === "" || insurance === " " || insurance === "NULL"  || insurance === "Cash Discount") {
          if (data === "Cash Discount") {
            return 'navy';
          } else {
            return 'lightblue';
          }
        }
        if ((data.toUpperCase()).indexOf(insurance) !== -1) {
          return 'navy'
        }
        return 'lightblue';
      }
      function getName(data) {
        insurance = insurance.toUpperCase();
        if (insurance === undefined || insurance === "" || insurance === " ") {
          return data;
        }
        if ((data.toUpperCase()).indexOf(insurance) !== -1) {
          //data = "Your insurance: "  + data (getting rid of this for now for UI purposes)
          return data;
        }
        return data;
      }
        var insurance = (this.props.insurance);
        insurance = insurance.toUpperCase();
        checker(Object.keys(this.props.b));
        var dtick_val = Number((Math.max(...Object.values(this.props.b))/10).toPrecision(1));
        var width = this.props.width
        var height = this.props.height * .75
        return (
            <div className='graph-font'>
                <Plotly data = {[{
                    type: 'bar',
                    x: (Object.keys(this.props.b)).map(d => getName(d)),
                    y: Object.values(this.props.b),
                    name: 'Insurance',
                    marker: {
                      color: (Object.keys(this.props.b)).map(d => getColor(d)),
                      width: 1,
                    },
                    hovertemplate: 
                      'Price You Pay: %{y:$,.2f}<extra></extra>'
                }]}
                
                layout = { {
                    title: {
                      text: "Price You Pay based on Insurance",
                      font: {
                        family: 'Tahoma',
                        size: 20,
                        color: '#141414',
                      }
                    },
                    width: `${width}`,
                    height: `${height}`,
                    xaxis: {
                      font: {
                        family: 'Tahoma',
                        color: '#141414',
                      },
                      automargin: true,
                      categoryorder: 'total ascending',
                      title: {
                        margin: 200,
                        text: '<b>Insurances</b>',
                        font: {
                          family: 'Tahoma',
                          size: 20,
                          color: '#141414'
                        }
                      },
                    },
                    yaxis: {
                        tickmode: "linear",
                        tick0: 0,
                        automargin: true,
                        dtick: `${dtick_val}`,
                      title: {
                        text: '<b>Price You Pay</b>',
                        font: {
                          family: 'Tahoma',
                          size: 20,
                          color: '#141414'
                        }
                      }
                    }
                }}
                config = {{
                  responsive: true,
                  displayModeBar: false,
                }}
                />
            </div>
        )
    }
}
export default Graph;


  // var trace1 = {
  //   x: Object.keys(b),
  //   y: Object.values(b),
  //   name: 'Insurance',
  //   type: 'bar'
  // };

  
  // var datm = [trace1];
  
  // var layout = {
  //   title: "Insurance Pricing (what you would pay)",
  //   xaxis: {
  //     title: {
  //       text: 'Insurances',
  //       font: {
  //         family: 'Courier New, monospace',
  //         size: 20,
  //         color: '#7f7f7f'
  //       }
  //     },
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Prices',
  //       font: {
  //         family: 'Courier New, monospace',
  //         size: 18,
  //         color: '#7f7f7f'
  //       }
  //     }
  //   }
  // };

  // Plotly.newPlot('graph', datm, layout);