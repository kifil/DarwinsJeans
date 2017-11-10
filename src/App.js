import React, { Component } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
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
            krakenCount: 5,
            shipCount: 20,
            fishCount: 100,
            healthLimit: 200,
            foodRate: 0.1,
            mutationRate: .01,
            isRunning: false
        };

        // Bind the ensure we get the component as "this" no matter where it is called
        this.changeCountByKey = this.changeCountByKey.bind(this);
        this.startSim = this.startSim.bind(this);
    };

    changeCountByKey(key, event){
        //set state can only be called outside of constructor and render methods
        //use the on change's new value to set the state
        this.setState({[key]: event.target.value});
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
                <Grid>
                    <Row>
                        <Col lg={9}>
                            <Panel header={startStopButton} bsStyle="primary">
                                <Row>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <ControlLabel>Krakens</ControlLabel>
                                            <FormControl
                                                ref="numKrakens"
                                                placeholder="#Krakens"
                                                defaultValue={this.state.krakenCount}
                                                onChange={this.changeCountByKey.bind(this, "krakenCount")} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <ControlLabel>Ships</ControlLabel>
                                            <FormControl
                                                ref="numShips"
                                                placeholder="#Ships"
                                                defaultValue={this.state.shipCount}
                                                onChange={this.changeCountByKey.bind(this, "shipCount")} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <ControlLabel>Fish</ControlLabel>
                                            <FormControl
                                                ref="numFish"
                                                placeholder="#Fish"
                                                defaultValue={this.state.fishCount}
                                                onChange={this.changeCountByKey.bind(this, "fishCount")} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <ControlLabel>Starting Health</ControlLabel>
                                            <FormControl
                                                ref="healthLimit"
                                                placeholder="health limit"
                                                defaultValue={this.state.healthLimit}
                                                onChange={this.changeCountByKey.bind(this, "healthLimit")} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <ControlLabel>Food Rate %</ControlLabel>
                                            <FormControl
                                                ref="foodRate"
                                                placeholder="food rate"
                                                defaultValue={this.state.foodRate}
                                                onChange={this.changeCountByKey.bind(this, "foodRate")} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={2}>
                                        <FormGroup>
                                            <ControlLabel>Mutation Rate %</ControlLabel>
                                            <FormControl
                                                ref="mutationRate"
                                                placeholder="mutation rate"
                                                defaultValue={this.state.mutationRate}
                                                onChange={this.changeCountByKey.bind(this, "mutationRate")} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={9}>
                                        <P5Wrapper
                                            sketch={sketch}
                                            krakenCount = {this.state.krakenCount}
                                            shipCount = {this.state.shipCount}
                                            fishCount = {this.state.fishCount}
                                            healthLimit = {this.state.healthLimit}
                                            foodRate = {this.state.foodRate}
                                            mutationRate = {this.state.mutationRate}
                                            isRunning = {this.state.isRunning}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Panel collapsible defaultExpanded header="Gene descriptions">
                                        <ListGroup fill>
                                            <ListGroupItem>Size-Speed: Higher values mean larger size, but slower speed</ListGroupItem>
                                            <ListGroupItem>Aging-Fertility: Higher values mean higher chance to reproduce, but lose energy faster</ListGroupItem>
                                        </ListGroup>
                                    </Panel>
                                </Row>
                            </Panel>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <CurrentStatsComponent
                                    sketch = {sketch}
                                    simulationRunStats = {window.world.simulationRunStats}
                                />
                            </Row>
                            <Row>
                                <SimulationStatsComponent/>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    };
}

export default App;