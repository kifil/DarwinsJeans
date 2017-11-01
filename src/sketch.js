import World from './world'
import axios from 'axios';
import SimulationRun from './simulationRun'

//https://github.com/NeroCor/react-p5-wrapper

//default export means that this is the only thing exported in teh module, this is preferred
//also means you don't use {} when importing it
window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

export default function sketch (p) {
    let rotation = 0;
    var foodCount = 0;
    let predatorCount = 0;
    let preyCount = 0;
    let world;
    let isRunning = false;
    let currentSimulationRun = {};
    let currentRunNumber = 0;

    p.setup = function (props) {
        p.createCanvas(800, 800);

        world = new World(p,currentSimulationRun, foodCount, predatorCount, preyCount);
        //world.simulationRun = currentSimulationRun;
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        console.log(props);

        if(props.foodCount){
            foodCount = props.foodCount;
        }
        if(props.predatorCount){
            predatorCount = props.predatorCount;
        }
        if(props.preyCount){
            preyCount = props.preyCount;
        }
        if (props.rotation){
            rotation = props.rotation * Math.PI / 180;
        }

        // Recreate world if sim is currently stopped but set to run
        //START
        if(!isRunning && props.isRunning){
            currentRunNumber++;
            currentSimulationRun = new SimulationRun(currentRunNumber);
            p.setup(props);
        }

        //STOP
        if(isRunning && !props.isRunning){
            world.stopRun();

            //save data
            axios.post('/simruns', currentSimulationRun)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.get('/simruns')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        isRunning = props.isRunning;
    };

    p.draw = function() {
        p.background(175);

        if(isRunning){
            world.run();
        }
    }

// We can add a creature manually if we so desire
//     p.mousePressed = function() {
//         world.born(p.mouseX,p.mouseY);
//     }
//
//     p.mouseDragged= function() {
//         world.born(p.mouseX,p.mouseY);
//     }

    // p.draw = function () {
    //     p.background(100);
    //     p.noStroke();
    //     p.push();
    //     p.rotateY(rotation);
    //     p.box(100);
    //     p.ellipse(50, 50, 80, 80);
    //     p.pop();
    // };
};
