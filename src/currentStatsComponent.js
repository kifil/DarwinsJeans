import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';

export default class CurrentStatsComponent extends Component {
    render() {
        var header = <p className="text-center">Current Statistics</p>;
        return (
            <Panel header={header} bsStyle="primary">
                <div>Simulation length: {this.props.worldTicks}</div>
                <div>Food Eaten: {this.props.foodEaten}</div>
                <div>Ship Deaths: {this.props.shipDeaths}</div>
                <div>Ship Berths: {this.props.shipsBorn}</div>
            </Panel>
        );
    };
}