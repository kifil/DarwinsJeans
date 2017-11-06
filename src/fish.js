import Creature from './creature';

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
}