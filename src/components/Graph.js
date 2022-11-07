import React, {Component} from 'react';
import Plotly from 'react-plotly.js';

class Graph extends Component {
    render() {
        return (
            <div>
                <Plotly data = {[{
                    type: 'bar', 
                    x: Object.keys(this.props.b),
                    y: Object.values(this.props.b),
                    name: 'Insurance'
                }]}
                layout = { {
                    title: "Insurance Pricing (what you would pay)",
                    width: 1300,
                    height: 700,
                    xaxis: {
                      categoryorder: 'category ascending',
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
                        dtick: 50000,
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