import World from './world'


//https://github.com/NeroCor/react-p5-wrapper

//default export means that this is the only thing exported in teh module, this is preferred
//also means you don't use {} when importing it
export default function sketch (p) {
    let rotation = 0;
    let world;
    let randomNumber = 0;

    p.setup = function () {
        //p.createCanvas(600, 360, p.WEBGL);
        p.createCanvas(640, 360);
        randomNumber = p.random();
        console.log("random number", randomNumber)
         world = new World(p, 50);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
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
