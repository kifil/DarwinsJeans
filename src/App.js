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
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class App extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Not Taco Time!</h1>
                    </header>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <center>
                                <P5Wrapper sketch={sketch} rotation={45} />
                            </center>
                        </div>
                    </div>
                    <div className="row col-lg-offset-4">
                        <div className="col-lg-2">
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Krakens"
                                placeholder="#Krakens"
                            />
                        </div>
                        <div className="col-lg-2">
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Ships"
                                placeholder="#Ships"
                            />
                        </div>
                        <div className="col-lg-2">
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Fish"
                                placeholder="#Fish"
                            />
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