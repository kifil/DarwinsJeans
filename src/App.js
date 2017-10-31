import React, { Component } from 'react';
import logo from './taco.svg';
import './App.css';
import axios from 'axios';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foodCount: 100,
            preyCount: 5,
            predatorCount: 20,
            isRunning: false,
        };

        this.changeCountByKey = this.changeCountByKey.bind(this);
    }

    changeCountByKey(key, event){
        var obj = {};
        obj[key] = ~~event.target.value;
        this.setState(obj);
    }

    render() {
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Kraken Lunch Time</h1>
                    </header>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <center>
                                <P5Wrapper
                                    sketch={sketch}
                                    foodCount = {this.state.foodCount}
                                    predatorCount = {this.state.predatorCount}
                                    preyCount = {this.state.preyCount}
                                    isRunning = {this.state.isRunning}
                                />
                            </center>
                        </div>
                    </div>
                    <div className="row col-lg-offset-4">
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
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Button className="center-block" bsStyle="primary" onClick={this.doStuff}>Start!</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

   doStuff() {
       axios.get('/topics')
           .then(function (response) {
               console.log(response);
           })
           .catch(function (error) {
               console.log(error);
           });
       return false;
   };
};

export default App;