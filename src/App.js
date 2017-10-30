import React, { Component } from 'react';
import logo from './taco.svg';
import wrestler from './mexicanwrestler.svg';
import './App.css';
import axios from 'axios';
import P5Wrapper from 'react-p5-wrapper';

window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

export function sketch (p) {
    let rotation = 0;

    p.setup = function () {
        p.createCanvas(600, 400, p.WEBGL);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if (props.rotation){
            rotation = props.rotation * Math.PI / 180;
        }
    };

    p.draw = function () {
        p.background(100);
        p.noStroke();
        p.push();
        p.rotateY(rotation);
        p.box(100);
        p.ellipse(50, 50, 80, 80);
        p.pop();
    };
};

class App extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Not Taco Time!</h1>
                </header>
                <div className="App-intro">
                    <img src={wrestler} className="Svg-icon" alt="wrestler" />
                    <p>"TO GET STARTED, EAT A TACO!"</p>
                    <button onClick={this.doStuff}>EAT</button>
                </div>
                <P5Wrapper sketch={sketch} ></P5Wrapper>
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