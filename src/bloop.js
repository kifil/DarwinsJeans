// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// Creature class

// Create a "bloop" creature
import p5 from "p5";

export default function Bloop(p, l, dna_, simulationRunStats) {
    this.position = l.copy();  // Location
    this.health = 200;  // Life timer
    this.xoff = p.random(1000);  // For perlin noise
    this.yoff = p.random(1000);
    this.dna = dna_;   // DNA
    this.simulationRunStats = simulationRunStats;
    this.currentVelocity = {};

    // DNA will determine size and maxspeed
    // The bigger the bloop, the slower it is
    this.maxspeed = p.map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = p.map(this.dna.genes[0], 0, 1, 0, 50);

    this.run = function() {
        this.update();
        this.borders();
        this.display();
    };

    // A bloop can find food and eat it
    this.eat = function(f) {
        var food = f.getFood();
        // Are we touching any food objects?
        for (var i = food.length-1; i >= 0; i--) {
            var foodLocation = food[i];
            var d = p5.Vector.dist(this.position, foodLocation);
            // If we are, juice up our strength!
            if (d < this.r/2) {
                //this.foodEaten++;
                this.simulationRunStats.foodEaten++;
                this.health += 100;
                food.splice(i,1);
            }
        }
    };

    // At any moment there is a teeny, tiny chance a bloop will reproduce
    this.reproduce = function() {
        // asexual reproduction
        //if (p.random(1) < 0.0005) {

        // Ships reproduce if health is over 300, just cuz
        if(this.health >= 300){
            this.health -= 200;
            // Child is exact copy of single parent
            var childDNA = this.dna.copy();
            // Child DNA can mutate
            childDNA.mutate(0.01);
            return new Bloop(p, this.position, childDNA, this.simulationRunStats);
        }

        return null;
    };

    // Method to update position
    this.update = function() {
        // Simple movement based on perlin noise

        var vx = p.map(p.noise(this.xoff),0,1,-this.maxspeed,this.maxspeed);
        var vy = p.map(p.noise(this.yoff),0,1,-this.maxspeed,this.maxspeed);
        this.currentVelocity = p.createVector(vx,vy);
        this.xoff += 0.01;
        this.yoff += 0.01;

        this.position.add(this.currentVelocity);
        // Death always looming
        this.health -= 0.2;
    };

    // Wraparound
    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = p.width+this.r;
        if (this.position.y < -this.r) this.position.y = p.height+this.r;
        if (this.position.x > this.width+this.r) this.position.x = -p.r;
        if (this.position.y > this.height+this.r) this.position.y = -p.r;
    };

    // Method to display
    this.display = function() {
        /*
        p.ellipseMode(p.CENTER);
        p.stroke(0,255);

        p.ellipse(this.position.x, this.position.y, this.r, this.r);
*/
        p.rectMode(p.CORNER);
        var healthBarWidth = this.r * 2;
        var healthPercent = this.health / 200;

        // Clamp the health bar to not be longer than 100%
        if(healthPercent > 1){
            healthPercent = 1;
        }

        p.noFill();
        p.rect(this.position.x - this.r,this.position.y - this.r, healthBarWidth, 8);
        p.fill(255, this.health, 0, 255);
        p.rect(this.position.x - this.r,this.position.y - this.r, healthBarWidth * healthPercent, 8);

        var image = this.currentVelocity.x > 0 ? p.shipRightImg : p.shipLeftImg;
        p.imageMode(p.CENTER);
        p.image(image, this.position.x, this.position.y, this.r, this.r);
    };

    // Death
    this.dead = function() {
        if (this.health < 0.0) {
            this.simulationRunStats.shipDeaths++;
            return true;
        }
        return false;
    };
}
