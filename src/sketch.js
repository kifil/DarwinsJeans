import World from './world'
import axios from 'axios';
import SimulationRun from './simulationRun'

//https://github.com/NeroCor/react-p5-wrapper

//default export means that this is the only thing exported in teh module, this is preferred
//also means you don't use {} when importing it
window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8080/';

export default function sketch (p) {
    var foodCount = 0;
    let predatorCount = 0;
    let preyCount = 0;
    let world;
    let isRunning = false;
    let currentSimulationRun = {};
    let currentRunNumber = 0;
    let canvas = {};
    let backgroundPattern = {};
    p.krakenImg = p.loadImage("assets/images/kraken.png");
    p.shipRightImg = p.loadImage("assets/images/shipRight.png");
    p.shipLeftImg = p.loadImage("assets/images/shipLeft.png");
    p.fishImg = p.loadImage("assets/images/fish.png");

    p.setup = function (props) {
        var renderer2D = p.createCanvas(800, 800);
        canvas = renderer2D.canvas;

        world = new World(p,currentSimulationRun, foodCount, predatorCount, preyCount);
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
        console.log(props);

        if(props.predatorCount){
            predatorCount = props.predatorCount;
        }
        if(props.preyCount){
            preyCount = props.preyCount;
        }
        if(props.foodCount){
            foodCount = props.foodCount;
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
