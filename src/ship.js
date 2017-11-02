import Creature from './creature';

export default class Ship extends Creature{
    health = this.simulationSettings.healthLimit;
    //constructor(p, l, dna_, type, simulationRunStats){
    // super(p, l, dna_, type, simulationRunStats);
    //}

    // At any moment there is a teeny, tiny chance a creature will reproduce
    reproduce() {
        // asexual reproduction
        //if (p.random(1) < 0.0005) {

        // Creature reproduce if health is over 300, just cuz
        if(this.health >= 300){
            this.health -= 200;
            // Child is exact copy of single parent
            var childDNA = this.dna.copy();
            // Child DNA can mutate
            childDNA.mutate(this.simulationSettings.mutationRate);
            return new Ship(this.p, this.position, childDNA, this.type, this.simulationRunStats, this.simulationSettings);
        }

        return null;
    };
}