import React, { Component } from 'react';
import logo from './taco.svg';
import wrestler from './mexicanwrestler.svg';
import './App.css';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

class App extends Component {

    constructor(props) {
        super(props);
        console.log('%cHello Developer!', 'color: #ffff00 ;font-size:100px;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;');
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