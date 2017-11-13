import Creature from './creature';
import DNA from './dna'
import p5 from 'p5';

export default class Kraken extends Creature {
    type = 'kraken';
    health = this.simulationSettings.healthLimit;

    constructor(p, l, dna_, simulationRunStats, simulationSettings) {
        super(p, l, dna_, simulationRunStats, simulationSettings);

        // Make krakens bigger but don't affect their dna or speed
        this.r *= 1.5;
    };

    getDisplayImage(){
        return this.p.images.krakenImg;
    };

    // A kraken can find ships and eat them
    eat(foodArray) {
        if (this.health >= this.simulationSettings.healthLimit) {
            return;
        }

        for (let i = foodArray.length - 1; i >= 0; i--) {
            let food = foodArray[i];
            let distance = p5.Vector.dist(this.position, food.position);

            if (distance < this.r) {
                this.simulationRunStats.shipDeaths++;
                this.health += food.health;
                foodArray.splice(i, 1);
                this.p.sounds.getfish.play();
            }
        }
    };

    reproduce() {
        // Creature reproduce if health is over 300, just cuz
        var fertilityRate = 0.005 * (this.dna.genes["Aging-Fertility"] / 1.5);
        if(this.health >= 200 && Math.random() < fertilityRate){
            this.health -= 100;
            // Child is exact copy of single parent
            var childDNA = this.dna.copy();
            // Child DNA can mutate
            childDNA.mutate(this.simulationSettings.mutationRate);
            this.simulationRunStats.krakenBorn++;
            this.p.sounds.krakenReproduce.play();
            return new Kraken(this.p, this.position, childDNA, this.simulationRunStats, this.simulationSettings);
        }

        return null;
    };

    static spawn(sketch, vector, dna, simulationRunStats, simulationSettings){
        vector = vector || sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
        dna = dna || new DNA(sketch);
        dna.genes["Speed-Size"] = 0.4;
        return new Kraken(sketch, vector, dna, simulationRunStats, simulationSettings)
    };

    // Death
    dead() {
        // TODO: update this to spawn a fish and delete itself
        if (this.health < 0.0) {
            this.p.sounds.death.play();
            this.simulationRunStats.krakenDeaths++;
            return true;
        }

        return false;
    };
}