import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
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
        var maxRunsToDisplay = 6;

        axios.get('/simruns/' + maxRunsToDisplay)
            .then(function (response) {
                newStats = response.data;
                console.log(newStats);
                self.setState({simulationRunStatsList: newStats});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return(
            <div>
                <Button className="center-block" bsStyle="primary" onClick={this.getStats.bind(this)}>Get new stats</Button>
                <div className="col-lg-12">
                    <ListGroup>
                        {this.state.simulationRunStatsList.map(function(statsRow){
                            return <SimulationStatsRowComponent simulationStatsRow = {statsRow}></SimulationStatsRowComponent>;
                        })}
                    </ListGroup>
                </div>
            </div>
        );
    };
}