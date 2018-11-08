import React from 'react';
import Table from './Table';
import Graph from './Graph';

/* Body component */
/* Collects date information from the user and distributes to the Table and Graph subcomponents */
/* Determines whether to render the graph or table as a subcomponent by user option*/
class Body extends React.Component{
    constructor(props){
        super(props);
        /* Initializing dates to cover the last 2 weeks */
        let start = new Date();
        start.setDate(start.getDate()-15);
        start = start.toISOString().substr(0,10);
        let end =  new Date().toISOString().substr(0,10);
        this.state = {
            display: 'table',
            start: start,
            end: end,
        };
    }

    changeStartDate = (event) => {
        this.setState({
            start: event.target.value
        });
    };

    changeEndDate = (event) => {
        this.setState({
            end: event.target.value
        });
    };
    changeDisplay = (display) =>{
        this.setState({display});
    };

    render(){
        return(
            <div className="body">
                <div className="wrapper">
                    <div className="dates">
                        <div className="start">Start Date:  <input type="date" name="start" value={this.state.start} onChange={this.changeStartDate}/></div>
                        <div className="end">End Date: <input type="date" name="start" value={this.state.end} onChange={this.changeEndDate}/></div>
                    </div>
                    <div className="info">
                        {(this.state.display === 'table' ? <Table start={this.state.start} end={this.state.end}/> : <Graph start={this.state.start} end={this.state.end}/>)}
                    </div>
                    <div className="toggle">
                        <div className="btn1"><button className={(this.state.display === 'table') ? ' button btnActive': 'button'} onClick={() => this.changeDisplay('table')}>Table</button></div>
                        <div className="btn2"><button className={(this.state.display === 'table') ? 'button' : 'btnActive button'} onClick={() => this.changeDisplay('graph')} >Graph</button></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;
