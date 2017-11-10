import Creature from './creature';
import p5 from 'p5';

export default class RubberDuck extends Creature {
    type = 'rubberduck';
    health = this.simulationSettings.healthLimit;

    constructor(p, l, dna_, simulationRunStats, simulationSettings) {
        super(p, l, dna_, simulationRunStats, simulationSettings);
        this.r *= 2;
    }

    getDisplayImage(){
        return this.currentVelocity.x > 0 ? this.p.images.rubberDuckRightImg : this.p.images.rubberDuckLeftImg;
    };

    // A rubber duck can find ships and eat them
    eat(foodArray) {
        for (let i = foodArray.length - 1; i >= 0; i--) {
            let food = foodArray[i];
            let distance = p5.Vector.dist(this.position, food.position);

            if (distance < this.r) {
                this.simulationRunStats.krakenDeaths++;
                this.health += food.health;
                foodArray.splice(i, 1);
                this.p.sounds.getfish.play();
            }
        }
    };

    reproduce() {

        return null;
    };

    // Death
    dead() {
        // TODO: update this to spawn a fish and delete itself
        if (this.health < 0.0) {
            this.p.sounds.death.play();
            //this.simulationRunStats.krakenDeaths++;
            return true;
        }

        return false;
    };
}