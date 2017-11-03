import React, { Component } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';
import SimulationStatsComponent from './simulationStatsComponent';
import CurrentStatsComponent from "./currentStatsComponent";
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class App extends Component {
    constructor(props) {
        //this super sets the props using react's base component constructor
        super(props);

        //this is how you set state in the constructor
        this.state = {
            predatorCount: 5,
            preyCount: 20,
            foodCount: 100,
            healthLimit: 200,
            foodRate: 0.1,
            mutationRate: .01,
            isRunning: false
        };

        //need to bind the ensure we get the component as "this" no matter where it is called
        this.changeCountByKey = this.changeCountByKey.bind(this);
        this.startSim = this.startSim.bind(this);
    };

    changeCountByKey(key, event){
        //set state can only be called outside of constructor and render methods
        //use the on change's new value to set the state
        this.setState({[key]: ~~event.target.value});
    };

    startSim(isRunning, event){
        this.setState({isRunning: isRunning});
    };

    render() {
        var startStopButton = this.state.isRunning
            ? <Button className="center-block" bsStyle="danger" onClick={this.startSim.bind(this, false)}>Stop</Button>
            : <Button className="center-block" bsStyle="success" onClick={this.startSim.bind(this, true)}>Start!</Button>
        ;
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src="assets/images/kraken.png" className="App-logo" alt="logo" />
                        <h1 className="App-title">Kraken Lunch Time</h1>
                    </header>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <Panel header={startStopButton} bsStyle="primary">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <FormGroup>
                                            <ControlLabel>Krakens</ControlLabel>
                                            <FormControl
                                                ref="numKrakens"
                                                placeholder="#Krakens"
                                                defaultValue={this.state.predatorCount}
                                                onChange={this.changeCountByKey.bind(this, "predatorCount")} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-2">
                                        <FormGroup>
                                            <ControlLabel>Ships</ControlLabel>
                                            <FormControl
                                                ref="numShips"
                                                placeholder="#Ships"
                                                defaultValue={this.state.preyCount}
                                                onChange={this.changeCountByKey.bind(this, "preyCount")} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-2">
                                        <FormGroup>
                                            <ControlLabel>Fish</ControlLabel>
                                            <FormControl
                                                ref="numFish"
                                                placeholder="#Fish"
                                                defaultValue={this.state.foodCount}
                                                onChange={this.changeCountByKey.bind(this, "foodCount")} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-2">
                                        <FormGroup>
                                            <ControlLabel>Starting Health</ControlLabel>
                                            <FormControl
                                                ref="healthLimit"
                                                placeholder="health limit"
                                                defaultValue={this.state.healthLimit}
                                                onChange={this.changeCountByKey.bind(this, "healthLimit")} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-2">
                                        <FormGroup>
                                            <ControlLabel>Food Rate %</ControlLabel>
                                            <FormControl
                                                ref="foodRate"
                                                placeholder="food rate"
                                                defaultValue={this.state.foodRate}
                                                onChange={this.changeCountByKey.bind(this, "foodRate")} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-2">
                                        <FormGroup>
                                            <ControlLabel>Mutation Rate %</ControlLabel>
                                            <FormControl
                                                ref="mutationRate"
                                                placeholder="mutation rate"
                                                defaultValue={this.state.mutationRate}
                                                onChange={this.changeCountByKey.bind(this, "mutationRate")} />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <P5Wrapper
                                            sketch={sketch}
                                            foodCount = {this.state.foodCount}
                                            predatorCount = {this.state.predatorCount}
                                            preyCount = {this.state.preyCount}
                                            healthLimit = {this.state.healthLimit}
                                            foodRate = {this.state.foodRate}
                                            mutationRate = {this.state.mutationRate}
                                            isRunning = {this.state.isRunning}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <Panel collapsible defaultExpanded header="Gene descriptions">
                                        <ListGroup fill>
                                            <ListGroupItem>Size-Speed: Higher values mean larger size, but slower speed</ListGroupItem>
                                            <ListGroupItem>Aging-Fertility: Higher values mean higher chance to reproduce, but lose energy faster</ListGroupItem>
                                        </ListGroup>
                                    </Panel>
                                </div>
                            </Panel>
                        </div>
                        <div className="col-lg-3">
                            <div className="row">
                                <CurrentStatsComponent/>
                            </div>
                            <div className="row">
                                <SimulationStatsComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default App;