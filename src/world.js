import Food from './food'
import Ship from './ship'
import DNA from './dna'

export default class World  {
    sketch = {};
    simulationRunStats = {};
    simulationSettings = {};
    creatures = {
        food: [],
        ships: [],
        kraken: [],
    };

    constructor(sketch,simulationRunStats, simulationSettings){
        this.sketch = sketch;
        this.simulationRunStats = simulationRunStats;
        this.simulationSettings = simulationSettings;

        // Start with initial food and creatures
        this.food = new Food(sketch, this.simulationSettings);
        this.creatures.ships = [];
        for (var i = 0; i < this.simulationSettings.preyCount; i++) {
            var l = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
            var dna = new DNA(sketch);
            this.creatures.ships.push(new Ship(sketch, l, dna, 'ship', this.simulationRunStats, this.simulationSettings));
        }
    }

    // Run the world
    run() {
        // Deal with food
        this.food.run();

        // Cycle through the ArrayList backwards b/c we are deleting
        for (var i = this.creatures.ships.length-1; i >= 0; i--) {
            // All bloops run and eat
            var b = this.creatures.ships[i];
            b.run();
            b.eat(this.food);
            // If it's dead, kill it and make food
            if (b.dead()) {
                this.creatures.ships.splice(i, 1);
                this.food.add(b.position);
            }
            // Perhaps this bloop would like to make a baby?
            var child = b.reproduce();
            if (child != null) this.creatures.ships.push(child);
        }

        this.simulationRunStats.worldTicks++;
    };

    stopRun() {
        // var that = this;
        // this.simulationRun.foodEaten = 0;
        // this.bloops.map(function(obj){
        //     that.simulationRun.foodEaten += obj.foodEaten;
        // });
        this.simulationRunStats.finalPopulationShips = this.creatures.ships.length;
        console.log('this.simulationRunStats', this.simulationRunStats);
    };


}