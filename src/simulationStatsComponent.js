import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

export default class SimulationStatsComponent extends Component {
    constructor(props) {
        //this super sets the props using react's base component constructor
        super(props);

        //this is how you set state in the constructor
        this.state = {
            simulationRunStatsList: [],
            number: 500
        };

        this.getStats = this.getStats.bind(this);
    };

    getStats(){
        var newStats;
        var self = this;

        axios.get('/simruns')
            .then(function (response) {
                console.log(response);
                newStats = response.data;
                self.setState({simulationRunStatsList: newStats});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return(
            <div>
                <div>HI</div>
                <Button className="center-block" bsStyle="primary" onClick={this.getStats.bind(this)}>Get new stats</Button>
                <div className="col-lg-12">{this.props.number}</div>
                <div className="col-lg-12">
                    {this.props.number}
                    hi again
                    {this.props.simulationRunStatsList}
                </div>
            </div>
        );
    };
}