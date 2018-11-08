import React from 'react';
import {Chart} from 'react-chartjs-2';
/* Graph Component
* Takes start and end dates as props
* Makes API calls to coindesk for all three currencies.
* Builds Chart JS object based on results from coindesk.
* Renders chart in Canvas*/
class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usd: [],
            cad: [],
            mxn: [],
            myChart: null,
        };
    }

    buildChart = () => {
        const node = this.node;
        let xAxis = [];
        let usd = [];
        let mxn = [];
        let cad = [];


        for(let x in this.state.usd){
            xAxis.push(x);
            usd.push(this.state.usd[x]);
            mxn.push(this.state.mxn[x]);
            cad.push(this.state.cad[x]);
        }

        /* Destroy previous chart to prevent flickering of old data bug */
        if(this.state.myChart !== null){
            this.state.myChart.destroy();
        }

        this.setState({
            myChart: new Chart(node,{
                type: "line",
                data: {
                    labels: xAxis,
                    datasets: [{
                        label: "Price in USD",
                        data: usd,
                        fill: false,
                        borderColor: "darkorange",
                    }, {
                        label: "Price in CDN",
                        data: cad,
                        fill: false,
                        borderColor: "red",
                    },{
                        label: "Price in MXN",
                        data: mxn,
                        fill: false,
                        borderColor: "yellow",
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            })
        });
    };

    /* Room for improvement. It is best to set up all these API calls as promises (Promise.All) and resolve with build chart.
    * I cannot guarantee these calls will resolve at the same time(async). So I build chart with every callback guaranteeing all the
     * Data is graphed. But there is a better way I should have done this.*/
    APICallAndUpdate(){
        const api = "https://api.coindesk.com/v1/bpi/historical/close.json?";
        fetch(api + "currency=" + "usd" +  "&start=" + this.props.start + "&end=" + this.props.end)
            .then(response => response.json())
            .then(data => this.setState({usd: data.bpi}))
            .then(() => this.buildChart());


        fetch(api + "currency=" + "cad" +  "&start=" + this.props.start + "&end=" + this.props.end)
            .then(response => response.json())
            .then(data => this.setState({cad: data.bpi}))
            .then(() => this.buildChart());


        fetch(api + "currency=" + "mxn" +  "&start=" + this.props.start + "&end=" + this.props.end)
            .then(response => response.json())
            .then(data => this.setState({mxn: data.bpi}))
            .then(() =>this.buildChart());
    }

    componentDidMount(){
        this.APICallAndUpdate();
    }


    componentDidUpdate(prevProps, prevState){
        if(prevProps.start !== this.props.start || prevProps.end !== this.props.end){
            this.setState({
                usd:[],
                mxn:[],
                cad:[],
            });
            this.APICallAndUpdate();
        }
    }
    render(){
        return(
            <div className="tableMain">
                <canvas style={{height: 20, width: 20}} ref={node =>(this.node = node)} className="canvas">Your Browser does not support the HTML5 canvas tag</canvas>
            </div>
        );
    }
}

export default Graph;