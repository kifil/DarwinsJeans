import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';

export default class CurrentStatsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulationRunStats: props.simulationRunStats
        };
    }

    componentDidMount(){
        var that = this;
        setInterval(function(){
            that.setState({
                simulationRunStats: window.world.simulationRunStats
            });
        },10);
    }

    render() {
        var header = <p className="text-center">Current Statistics {window.isRunning ? 'yes' : 'no'}</p>;


        return (
            <Panel header={header}>
                <div className="row">
                    <div className="col-md-9">Simulation Length</div>
                    <div className="col-md-3 text-right">{this.state.simulationRunStats.worldTicks}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Food Eaten</div>
                    <div className="col-md-3 text-right">{this.state.simulationRunStats.foodEaten}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Ship Deaths</div>
                    <div className="col-md-3 text-right">{this.state.simulationRunStats.shipDeaths}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Ship Berths</div>
                    <div className="col-md-3 text-right">{this.state.simulationRunStats.shipsBorn}</div>
                </div>
                <div className="row">
                    <div className="col-md-9">Current Ship Population</div>
                    <div className="col-md-3 text-right">{this.state.simulationRunStats.currentPopulationShips}</div>
                </div>
                <div className="row">
                    <div className="col-md-8">Avg. Size-Speed</div>
                    <div className="col-md-4 text-right">{this.state.simulationRunStats.averageSizeSpeed > 0 ? this.state.simulationRunStats.averageSizeSpeed.toFixed(3) : ''}</div>
                </div>
            </Panel>
        );
    };
}