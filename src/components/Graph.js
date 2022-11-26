import { Opacity } from '@mui/icons-material';
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import React, {Component} from 'react';
import Plotly from 'react-plotly.js';

class Graph extends Component {
  
    render() {
      function getColor(data) {
        insurance = insurance.toUpperCase();

        if (insurance === undefined || insurance === "" || insurance === " ") {
          return 'lightblue';
        }
        if ((data.toUpperCase()).indexOf(insurance) !== -1) {
          return 'red'
        }
        return 'lightblue';
      }
      function getName(data) {
        insurance = insurance.toUpperCase();
        if (insurance === undefined || insurance === "" || insurance === " ") {
          return data;
        }
        if ((data.toUpperCase()).indexOf(insurance) !== -1) {
          data = "USER'S INSURANCE: "  + data
          return data;
        }
        return data;
      }
        var insurance = (this.props.insurance);
        var dtick_val = Number((Math.max(...Object.values(this.props.b))/10).toPrecision(1));
        var width = window.innerWidth * .90
        var height = window.innerHeight * .75
        return (
            <div>
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
                      'Price: %{y:$,.2f}<extra></extra>'
                }]}
                layout = { {
                    title: "Insurance Pricing (what you would pay)",
                    width: `${width}`,
                    height: `${height}`,
                    xaxis: {
                      automargin: true,
                      categoryorder: 'total ascending',
                      title: {
                        text: 'Insurances',
                        font: {
                          family: 'Courier New, monospace',
                          size: 20,
                          color: '#7f7f7f'
                        }
                      },
                    },
                    yaxis: {
                        tickmode: "linear",
                        tick0: 0,
                        automargin: true,
                        dtick: `${dtick_val}`,
                      title: {
                        text: 'Prices',
                        font: {
                          family: 'Courier New, monospace',
                          size: 20,
                          color: '#7f7f7f'
                        }
                      }
                    }
                }}
                config = {{
                  responsive: true
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