import React from 'react';

/* Table component
 * Takes start and end date information as props
 * Determines the currency the user wants to see
 * Makes API call to coindesk on mount, props change and currency state change.
 * Checks dates to make sure valid and reports back
 * Renders Table with data from coindesk.
 * If no data is present will display an animated loader with warning that date selection may not make sense.*/
class Table extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hits: [],
            currency: 'USD',
            failed: false,
        };
    }
    /* Called when this component enters the DOM */
    componentDidMount(){
        this.APIcallAndUpdate();
    }
    /* Called on each re-render cycle */
    componentDidUpdate(prevProps, prevState){
        /* Check to see if any changes to our important things */
        if(prevProps.start !== this.props.start || prevProps.end !== this.props.end || prevState.currency !== this.state.currency){
            /* Empty our list to show loading state */
            this.setState({
                hits:[],
                failed: false,
            });
            /* Make API call and upadte based on new information */
            this.APIcallAndUpdate();
        }
    }
    changeCur = (currency) =>{
        this.setState({currency: currency});
    };

    /* Makes API call to coindesk based on parameters and updates hits state with new data */
    APIcallAndUpdate = () =>{
        // Check that dates are valid //
        if(new Date(this.props.start) >= new Date() || new Date(this.props.start) > new Date(this.props.end)){
            this.setState({
                failed: true,
            });
            return;
        }

        const api = "https://api.coindesk.com/v1/bpi/historical/close.json?";
        fetch(api + "currency=" + this.state.currency +  "&start=" + this.props.start + "&end=" + this.props.end)
            .then(response => response.json())
            .then(data => this.setState({hits: data.bpi}));
    };


    render(){
        /* Rows will contain all the html table rows we wish to display */
        let rows=[];
        if(this.state.hits.length === 0){
            if(this.state.failed === true){
                rows.push(<tr><td colSpan="2">The time frame entered is unavailable</td></tr>)
            }else{
                rows.push(<tr><td colSpan="2"><div class="lds-dual-ring"></div></td></tr>);
            }
        }
        else{
            for(let x in this.state.hits){
                rows.push(<tr><td>{x}</td><td>{this.state.hits[x]}</td></tr>);
            }
            let end = new Date(this.props.end);
            end.setDate(end.getDate()+1);
            if(end >= new Date()){
                rows.push(<tr><td colSpan="2">Further results are not yet available</td></tr>)
            }
        }

        return(
            <div className="tableMain">
                <div className="vsScroll">
                    <table>
                        <tr>
                            <th colSpan="2">Bitcoin Closing Prices</th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Price ({this.state.currency})</th>
                        </tr>
                        {rows}
                    </table>
                </div>
                <div className="options">
                    <div className="btn1"><button className={(this.state.currency === 'USD') ? ' button btnActive': 'button'} onClick={() => this.changeCur('USD')}>USD</button></div>
                    <div className="btn2"><button className={(this.state.currency === 'CAD') ? ' button btnActive': 'button'} onClick={() => this.changeCur('CAD')}>CAD</button></div>
                    <div className="btn3"><button className={(this.state.currency === 'MXN') ? ' button btnActive': 'button'} onClick={() => this.changeCur('MXN')}>MXN</button></div>
                </div>
            </div>

        );
    }
}



export default Table;