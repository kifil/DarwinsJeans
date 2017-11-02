import World from './world'
import axios from 'axios';
import SimulationRun from './simulationRun'
import SimulationSettings from './simulationSettings'

//https://github.com/NeroCor/react-p5-wrapper

//default export means that this is the only thing exported in teh module, this is preferred
//also means you don't use {} when importing it
window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

export default function sketch (p) {
    let simulationSettings = {};

    let world;
    let isRunning = false;
    let currentSimulationRun = {};
    let currentRunNumber = 0;
    let canvas = {};
    let backgroundPattern = {};
    p.images = {
        krakenImg: p.loadImage("assets/images/kraken.png"),
        shipRightImg: p.loadImage("assets/images/shipRight.png"),
        shipLeftImg: p.loadImage("assets/images/shipLeft.png"),
        fishImg: p.loadImage("assets/images/fish.png"),
    };

    p.setup = function () {
        var renderer2D = p.createCanvas(800, 800);
        canvas = renderer2D.canvas;

        world = new World(p,currentSimulationRun, simulationSettings);
        //world.simulationRun = currentSimulationRun;
        getTiledBackground();
    };

    let getTiledBackground = function() {
        var context = canvas.getContext("2d");
        var img = new Image();
        img.src = 'assets/images/water tile.png';

        img.onload = function(){
            // Create a pattern with this image, and set it to "repeat".
            backgroundPattern = context.createPattern(img, 'repeat');
            drawBackground();
        };
    };

    let drawBackground = function(){
        var context = canvas.getContext("2d");
        context.fillStyle = backgroundPattern;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        simulationSettings = new SimulationSettings(
            props.predatorCount,
            props.preyCount,
            props.foodCount,
            props.healthLimit,
            props.foodRate,
            props.mutationRate)
        // console.log("props", props);
        // console.log("settings", simulationSettings);

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
        }

        isRunning = props.isRunning;
    };

    p.draw = function() {
        drawBackground();

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
