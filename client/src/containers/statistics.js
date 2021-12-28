import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
import ContactService from '../services/contact.service'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Statistics extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    
    componentDidMount() {
        ContactService.getChartContact().then(res => {
            if (res.data.length > 0) {
                this.setState({
                   users:res.data
                });
            } 
        });

    }
  
    render() {
        const options = {
            exportEnabled: false,
            backgroundColor: "#e9ecef",
            animationEnabled: true,
            title: {
                text: "Contact Distribution"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label}: {y} Contacts",
                dataPoints: this.state.users
            }]
        }

        return (
            <div className="container">
                <div className="jumbotron py-0">
                    <div className="h1 text-warning">Your Contact Statistics</div>
                    <CanvasJSChart options={options}/>
                </div>
            </div>
        );
    }
}


