import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';


export default class SimulationStatsRowComponent extends Component {
    render() {
        var header = <p className="text-center">{`Simulation #${this.props.simulationStatsRow.id}`}</p>;
        return (
            <Panel header={header}>
                <div className="row">
                    <div className="col-md-9">Simulation length</div>
                    <div className="col-md-3 text-right">{this.props.simulationStatsRow.worldTicks}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Food Eaten</div>
                    <div className="col-md-3 text-right">{this.props.simulationStatsRow.foodEaten}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Ship Deaths</div>
                    <div className="col-md-3 text-right">{this.props.simulationStatsRow.shipDeaths}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Ship Berths</div>
                    <div className="col-md-3 text-right">{this.props.simulationStatsRow.shipsBorn}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Final Ship Population</div>
                    <div className="col-md-3 text-right">{this.props.simulationStatsRow.finalPopulationShips}</div>
                </div>
                <div className="row">
                    <div className="col-md-8">Avg. Size-Speed</div>
                    <div className="col-md-4 text-right">{this.props.simulationStatsRow.averageSizeSpeed.toFixed(3)}</div>
                </div>
            </Panel>
        );
    };
}