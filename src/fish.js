import Creature from './creature';

export default class Fish extends Creature{
    health = this.simulationSettings.healthLimit;
    //constructor(p, l, dna_, type, simulationRunStats){
    // super(p, l, dna_, type, simulationRunStats);
    //}

    getDisplayImage(){
        return this.p.images.fishImg;
    }

    displayHealthBar(){
        // Don't display a health bar
    }

    move(){
        // Don't move
    }

    age(){
        // Don't age
    }

    reproduce() {
        // There's a small chance food will appear randomly
        if (p.random(1) < this.simulationSettings.foodRate) {
            this.food.push(p.createVector(p.random(p.width),p.random(p.height)));
        }
    }
}