import Creature from './creature';

export default class Fish extends Creature{
    health = this.simulationSettings.healthLimit;
    //constructor(p, l, dna_, type, simulationRunStats){
    // super(p, l, dna_, type, simulationRunStats);
    //}

    update() {
    }

    reproduce() {
        // There's a small chance food will appear randomly
        /*if (p.random(1) < simulationSettings.foodRate) {
            this.food.push(p.createVector(p.random(p.width),p.random(p.height)));
        }*/
    }
}