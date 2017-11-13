import Ship from './ship'
import Fish from './fish'
import Kraken from './kraken'
import DNA from './dna'
import RubberDuck from "./rubberduck";

export default class World  {
    sketch = {};
    simulationRunStats = {};
    simulationSettings = {};
    creatures = {
        fish: [],
        ships: [],
        kraken: [],
        rubberDucks: [],
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

        // Spawn fish
        this.creatures.fish = [];
        for (let i = 0; i < this.simulationSettings.fishCount; i++) {
            this.spawnCreature('fish', this.creatures.fish);
        }

        // Spawn ships
        this.creatures.ships = [];
        for (let i = 0; i < this.simulationSettings.shipCount; i++) {
            this.spawnCreature('ship', this.creatures.ships);
        }

        // Spawn kraken
        this.creatures.kraken = [];
        for (let i = 0; i < this.simulationSettings.krakenCount; i++) {
            this.spawnCreature('kraken', this.creatures.kraken);
        }

        // Spawn rubber duck
        this.creatures.rubberDucks = [];
        for (let i = 0; i < this.simulationSettings.rubberDuckCount; i++) {
            this.spawnCreature('rubberDuck', this.creatures.rubberDucks);
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


        // Cycle through the ArrayList backwards b/c we may be deleting
        for (let i = this.creatures.ships.length-1; i >= 0; i--) {
            let ship = this.creatures.ships[i];
            ship.run();
            ship.eat(this.creatures.fish);

            // If it's dead, kill it and make food
            if (ship.dead()) {
                this.creatures.ships.splice(i, 1);
                let dna = new DNA(this.sketch);
                dna.genes["Speed-Size"] = .4;
                let fish = new Fish(this.sketch, ship.position, dna, this.simulationRunStats, this.simulationSettings);
                this.creatures.fish.push(fish);
            }

            // Reproduce
            let child = ship.reproduce();
            if (child != null){
                this.creatures.ships.push(child);
            }
        }

        // Cycle through the ArrayList backwards b/c we may be deleting
        for (let i = this.creatures.kraken.length-1; i >= 0; i--) {
            let kraken = this.creatures.kraken[i];
            kraken.run();
            kraken.eat(this.creatures.ships);

            // If it's dead, kill it and make food
            if (kraken.dead()) {
                this.creatures.kraken.splice(i, 1);
                let dna = new DNA(this.sketch);
                dna.genes["Speed-Size"] = .4;
                let fish = new Fish(this.sketch, kraken.position, dna, this.simulationRunStats, this.simulationSettings);
                this.creatures.fish.push(fish);
            }

            // Reproduce
            let child = kraken.reproduce();
            if (child != null){
                this.creatures.kraken.push(child);
            }
        }

        // Cycle through the ArrayList backwards b/c we may be deleting
        for (let i = this.creatures.rubberDucks.length-1; i >= 0; i--) {
            let duck = this.creatures.rubberDucks[i];
            duck.run();
            duck.eat(this.creatures.kraken);

            // If it's dead, kill it and make food
            if (duck.dead()) {
                this.creatures.rubberDucks.splice(i, 1);
                let dna = new DNA(this.sketch);
                dna.genes["Speed-Size"] = .4;
                let fish = new Fish(this.sketch, duck.position, dna, this.simulationRunStats, this.simulationSettings);
                this.creatures.fish.push(fish);
            }
        }

        this.updateRunStats();
        this.display();
        window.world = this;
    };

    updateRunStats(){
        this.calculateMedianSpeedSize();
        this.calculateMedianAgingFertility();
        this.simulationRunStats.worldTicks++;
    };

    calculateMedianSpeedSize(){
        var geneValues = [];
        this.creatures.ships.map(function(ship){
            geneValues.push(ship.dna.genes["Speed-Size"]);
        });

        this.simulationRunStats.currentPopulationShips = this.creatures.ships.length;
        this.simulationRunStats.medianSizeSpeed = this.median(geneValues, this.simulationRunStats.medianSizeSpeed);
        this.simulationRunStats.worldTicks++;
    };

    calculateMedianAgingFertility(){
        var geneValues = [];
        this.creatures.ships.map(function(ship){
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
        this.simulationRunStats.finalPopulationShips = this.creatures.ships.length;
    };
}