import Creature from './creature';
import DNA from './dna'

export default class Fish extends Creature{
    type = 'fish';
    health = 100;
    //constructor(p, l, dna_, type, simulationRunStats){
    // super(p, l, dna_, type, simulationRunStats);
    //}

    getDisplayImage(){
        return this.p.images.fishImg;
    };

    displayHealthBar(){
        // Don't display a health bar
    };

    move(){
        // Don't move
    };

    age(){
        // Don't age
    };

    reproduce() {
        console.log('reproduce');

    };

    static spawn(sketch, vector, dna, simulationRunStats, simulationSettings){
        vector = vector || sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
        dna = dna || new DNA(sketch);
        dna.genes["Speed-Size"] = 0.4;
        return new Fish(sketch, vector, dna, simulationRunStats, simulationSettings)
    };
}