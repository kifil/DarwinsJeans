import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import SimulationStatsRowComponent from './statsRowComponent'
import ListGroup from 'react-bootstrap/lib/ListGroup';

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

export default class SimulationStatsComponent extends Component {
    constructor(props) {
        //this super sets the props using react's base component constructor
        super(props);

        //this is how you set state in the constructor
        this.state = {
            simulationRunStatsList: []
        };

        this.getStats = this.getStats.bind(this);
    };

    getStats(){
        var newStats;
        var self = this;
        // var maxRunsToDisplay = 6;
        //
        // axios.get('/simruns/' + maxRunsToDisplay)
        //     .then(function (response) {
        //         newStats = response.data;
        //         // console.log(newStats);
        //         self.setState({simulationRunStatsList: newStats});
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        axios.get('/simruns/last-six-runs/')
            .then(function (response) {
                newStats = response.data;
                console.log(newStats);
                self.setState({simulationRunStatsList: newStats})
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        var button = <Button className="center-block" bsStyle="success" onClick={this.getStats.bind(this)}>Get Statistics</Button>;
        return(
            <Panel header={button} bsStyle="primary">
                <div className="col-lg-12">
                    {this.state.simulationRunStatsList.map(function(statsRow, index){
                        return <SimulationStatsRowComponent key = {index} simulationStatsRow = {statsRow}></SimulationStatsRowComponent>;
                    })}
                </div>
            </Panel>
        );
    };
}