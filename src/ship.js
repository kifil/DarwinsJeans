import Creature from './creature';
import DNA from './dna'
import p5 from 'p5';

export default class Ship extends Creature{
    type = 'ship';
    health = this.simulationSettings.healthLimit;

    getDisplayImage(){
        return this.currentVelocity.x > 0 ? this.p.images.shipRightImg : this.p.images.shipLeftImg;
    };

    // A ship can find fish and eat it
    eat(foodArray) {
        if (this.health >= this.simulationSettings.healthLimit) {
            return;
        }

        for (let i = foodArray.length - 1; i >= 0; i--) {
            let food = foodArray[i];
            let distance = p5.Vector.dist(this.position, food.position);

            if (distance < this.r) {
                this.simulationRunStats.foodEaten++;
                this.health += food.health;
                foodArray.splice(i, 1);
                this.p.sounds.getfish.play();
            }
        }
    };

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
            this.p.sounds.shipReproduce.play();
            return new Ship(this.p, this.position, childDNA, this.simulationRunStats, this.simulationSettings);
        }

        return null;
    };

    static spawn(sketch, vector, dna, simulationRunStats, simulationSettings){
        vector = vector || sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
        dna = dna || new DNA(sketch);
        return new Ship(sketch, vector, dna, simulationRunStats, simulationSettings)
    };

    // Death
    dead() {
        // TODO: update this to spawn a fish and delete itself
        if (this.health < 0.0) {
            this.p.sounds.death.play();
            this.simulationRunStats.shipDeaths++;
            return true;
        }

        return false;
    };
}