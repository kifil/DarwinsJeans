import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';


export default class SimulationStatsRowComponent extends Component {
    render() {
        return (
            <Panel header={`Simulation number: ${this.props.simulationStatsRow.id}`}>
                <div class="row">
                    <div class="col-md-9">Simulation length</div>
                    <div class="col-md-3 text-right">{this.props.simulationStatsRow.worldTicks}</div>
                </div>
                <div class="row">
                    <div class="col-md-9">Food Eaten</div>
                    <div class="col-md-3 text-right">{this.props.simulationStatsRow.foodEaten}</div>
                </div>
                <div class="row">
                    <div class="col-md-9">Ship Deaths</div>
                    <div class="col-md-3 text-right">{this.props.simulationStatsRow.shipDeaths}</div>
                </div>
                <div class="row">
                    <div class="col-md-9">Ship Berths</div>
                    <div class="col-md-3 text-right">{this.props.simulationStatsRow.shipsBorn}</div>
                </div>
                <div class="row">
                    <div class="col-md-9">Final Ship Population</div>
                    <div class="col-md-3 text-right">{this.props.simulationStatsRow.finalPopulationShips}</div>
                </div>
                <div class="row">
                    <div class="col-md-8">Median Size-Speed</div>
                    <div class="col-md-4 text-right">{this.props.simulationStatsRow.medianSizeSpeed.toFixed(3)}</div>
                </div>
            </Panel>
        );
    };
}