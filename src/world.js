import Food from './food'
import Bloop from './bloop'
import DNA from './dna'

export default class World  {
    sketch = {};
    simulationRunStats = {};
    simulationSettings = {};

    constructor(sketch,simulationRunStats, simulationSettings){
        this.sketch = sketch;
        this.simulationRunStats = simulationRunStats;
        this.simulationSettings = simulationSettings;

        // Start with initial food and creatures
        this.food = new Food(sketch, this.simulationSettings);
        this.bloops = [];        // An array for all creatures
        for (var i = 0; i < this.simulationSettings.preyCount; i++) {
            var l = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
            var dna = new DNA(sketch);
            this.bloops.push(new Bloop(sketch, l, dna, 'bloop', this.simulationRunStats, this.simulationSettings));
        }
    }

    // Make a new creature
    // this.born = function(x, y) {
    //     var l = sketch.createVector(x, y);
    //     var dna = new DNA(sketch);
    //     this.bloops.push(new Bloop(sketch, l, dna));
    // }

    // Run the world
    run() {
        // Deal with food
        this.food.run();

        // Cycle through the ArrayList backwards b/c we are deleting
        for (var i = this.bloops.length-1; i >= 0; i--) {
            // All bloops run and eat
            var b = this.bloops[i];
            b.run();
            b.eat(this.food);
            // If it's dead, kill it and make food
            if (b.dead()) {
                this.bloops.splice(i, 1);
                this.food.add(b.position);
            }
            // Perhaps this bloop would like to make a baby?
            var child = b.reproduce();
            if (child != null) this.bloops.push(child);
        }

        this.simulationRunStats.worldTicks++;
    };

    stopRun() {
        // var that = this;
        // this.simulationRun.foodEaten = 0;
        // this.bloops.map(function(obj){
        //     that.simulationRun.foodEaten += obj.foodEaten;
        // });
        console.log('this.simulationRunStats', this.simulationRunStats);
    };


}