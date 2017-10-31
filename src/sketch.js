import World from './world'


//https://github.com/NeroCor/react-p5-wrapper

//default export means that this is the only thing exported in teh module, this is preferred
//also means you don't use {} when importing it

export default function sketch (p) {
    let rotation = 0;
    var foodCount = 0;
    let predatorCount = 0;
    let preyCount = 0;
    let world;

    p.setup = function (props) {
        p.createCanvas(800, 800);

        world = new World(p, foodCount, predatorCount, preyCount);
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
    };

    p.draw = function() {
        p.background(175);
        world.run();
    }

// We can add a creature manually if we so desire
    p.mousePressed = function() {
        world.born(p.mouseX,p.mouseY);
    }

    p.mouseDragged= function() {
        world.born(p.mouseX,p.mouseY);
    }

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
