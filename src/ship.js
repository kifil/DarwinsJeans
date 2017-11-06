import Creature from './creature';

export default class Ship extends Creature{
    health = this.simulationSettings.healthLimit;
    //constructor(p, l, dna_, type, simulationRunStats){
    // super(p, l, dna_, type, simulationRunStats);
    //}

    // At any moment there is a teeny, tiny chance a creature will reproduce
    reproduce() {
        // Creature reproduce if health is over 300, just cuz
        var fertilityRate = 0.005 * (this.dna.genes["Aging-Fertility"] * 2);
        if(this.health >= 200 && Math.random() < fertilityRate){
            this.health -= 100;
            // Child is exact copy of single parent
            var childDNA = this.dna.copy();
            // Child DNA can mutate
            childDNA.mutate(this.simulationSettings.mutationRate);
            this.simulationRunStats.shipsBorn++;
            this.p.sounds.reproduce.play();
            return new Ship(this.p, this.position, childDNA, this.type, this.simulationRunStats, this.simulationSettings);
        }

        return null;
    }
}