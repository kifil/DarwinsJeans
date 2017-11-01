import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';


export default class SimulationStatsRowComponent extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <ListGroupItem>
                <div>Simulation number: {this.props.simulationStatsRow.id}</div>
                <div>Simulation length: {this.props.simulationStatsRow.worldTicks}</div>
                <div>Food Eaten: {this.props.simulationStatsRow.foodEaten}</div>
                <div>Ship Deaths: {this.props.simulationStatsRow.shipDeaths}</div>
            </ListGroupItem>
        );
    };
}