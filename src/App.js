import React, { Component } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import SimulationStatsComponent from './simulationStatsComponent';



class App extends Component {
    constructor(props) {
        //this super sets the props using react's base component constructor
        super(props);

        //this is how you set state in the constructor
        this.state = {
            predatorCount: 5,
            preyCount: 20,
            foodCount: 100,
            isRunning: false,
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
            ? <Button className="center-block" bsStyle="primary" onClick={this.startSim.bind(this, false)}>Stop</Button>
            : <Button className="center-block" bsStyle="primary" onClick={this.startSim.bind(this, true)}>Start!</Button>
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
                        <div className="col-lg-12">
                            <div className="col-lg-9">
                                <P5Wrapper
                                    sketch={sketch}
                                    foodCount = {this.state.foodCount}
                                    predatorCount = {this.state.predatorCount}
                                    preyCount = {this.state.preyCount}
                                    isRunning = {this.state.isRunning}
                                />
                                <div className="row">
                                    <div className="col-lg-2 col-lg-offset-3">
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
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        {startStopButton}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <SimulationStatsComponent></SimulationStatsComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default App;