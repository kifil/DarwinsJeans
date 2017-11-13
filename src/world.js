import Ship from './ship'
import Fish from './fish'
import Kraken from './kraken'
import DNA from './dna'
import RubberDuck from "./rubberduck";

export default class World  {
    sketch = {};
    simulationRunStats = {};
    simulationSettings = {};

    /* Adding new creature types here will be automatically spawned so there's a few things to do:
     * 1. Make sure the new creature class exists.
     * 2. Make sure it has an entry for the new type the typeToClassMap.
     * 3. Make sure simulationSettings contains a count for how many should spawn.
     */
    creatures = {
        fish: [],
        ship: [],
        kraken: [],
        rubberDuck: [],
    };

    typeToClassMap = {
        fish: Fish,
        ship: Ship,
        kraken: Kraken,
        rubberDuck: RubberDuck,
    };

    constructor(sketch,simulationRunStats, simulationSettings){
        this.sketch = sketch;
        this.simulationRunStats = simulationRunStats;
        this.simulationSettings = simulationSettings;
        this.simulationSettings.rubberDuckCount = 1;

        // Spawn creatures
        for(let key in this.creatures){
            this.creatures[key] = [];
            for (let i = 0; i < this.simulationSettings[`${key}Count`]; i++) {
                this.spawnCreature(key, this.creatures[key]);
            }
        }
    };

    spawnCreature(creatureType, creatureCollection){
        let creature = this.typeToClassMap[creatureType].spawn(this.sketch, null, null, this.simulationRunStats, this.simulationSettings);
        creatureCollection.push(creature);
    };

    // Run the world
    run() {
        var extinction = false;
        for(let key in this.creatures){
            if(this.creatures[key].length === 0 && key !== 'fish'){
                extinction = true;
                this.displayExtinction(`All the ${key} have perished!`);
            }
        }
        /*if(extinction){
            return;
        }*/

        // Run the fish
        for (let i = this.creatures.fish.length-1; i >= 0; i--) {
            let fish =  this.creatures.fish[i];
            fish.run();
        }

        // There's a small chance a fish will appear randomly
        if (Math.random() < this.simulationSettings.foodRate) {
            let dna = new DNA(this.sketch);
            dna.genes["Speed-Size"] = .4;
            let vector = this.sketch.createVector(this.sketch.random(this.sketch.width), this.sketch.random(this.sketch.height));
            let fish = new Fish(this.sketch, vector, dna, this.simulationRunStats, this.simulationSettings);
            this.creatures.fish.push(fish);
        }


        this.runCreature('ship', 'fish');
        this.runCreature('kraken', 'ship');
        this.runCreature('rubberDuck', 'kraken');

        this.updateRunStats();
        this.display();
        window.world = this;
    };

    runCreature(creatureType, food){
        // Cycle through the ArrayList backwards b/c we may be deleting
        for (let i = this.creatures[creatureType].length-1; i >= 0; i--) {
            let creature = this.creatures[creatureType][i];
            creature.run();
            creature.eat(this.creatures[food]);

            // If it's dead, kill it and make food
            if (creature.dead()) {
                this.creatures[creatureType].splice(i, 1);
                let dna = new DNA(this.sketch);
                dna.genes["Speed-Size"] = .4;
                let fish = new Fish(this.sketch, creature.position, dna, this.simulationRunStats, this.simulationSettings);
                this.creatures.fish.push(fish);
            }

            // Reproduce
            let child = creature.reproduce();
            if (child != null){
                this.creatures[creatureType].push(child);
            }
        }
    };

    updateRunStats(){
        this.calculateMedianSpeedSize();
        this.calculateMedianAgingFertility();
        this.simulationRunStats.worldTicks++;
    };

    calculateMedianSpeedSize(){
        var geneValues = [];
        this.creatures.ship.map(function(ship){
            geneValues.push(ship.dna.genes["Speed-Size"]);
        });

        this.simulationRunStats.currentPopulationShips = this.creatures.ship.length;
        this.simulationRunStats.medianSizeSpeed = this.median(geneValues, this.simulationRunStats.medianSizeSpeed);
        this.simulationRunStats.worldTicks++;
    };

    calculateMedianAgingFertility(){
        var geneValues = [];
        this.creatures.ship.map(function(ship){
            geneValues.push(ship.dna.genes["Aging-Fertility"]);
        });

        this.simulationRunStats.medianAgingFertility = this.median(geneValues, this.simulationRunStats.medianAgingFertility);
    };

    median(numbers, lastValue) {
        var median = 0, numsLen = numbers.length;
        numbers.sort();

        if (numsLen % 2 === 0) {
            median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
        } else {
            median = numbers[(numsLen - 1) / 2];
        }
        if(isNaN(median)){
            return lastValue;
        }
        return median;
    };

    display() {
        //display text on sketch
        this.sketch.textSize(16);
        this.sketch.fill(0,0,0);
        this.sketch.text("© 2017 Darwin's Jeans", 5, 790);
    };

    displayExtinction(message) {
        //display text on sketch
        this.sketch.textSize(32);
        this.sketch.fill(0,0,0);
        this.sketch.text(message, 5, 32);
    };

    stopRun() {
        this.simulationRunStats.finalPopulationShips = this.creatures.ship.length;
    };
}