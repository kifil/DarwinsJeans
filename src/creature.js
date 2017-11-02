import p5 from 'p5';

export default class Creature {
    type = 'creature';
    health = -1;
    position = {};
    xoff = 0;
    yoff = 0;
    dna = {};   // DNA
    simulationRunStats = {};
    currentVelocity = {};

    constructor(p, l, dna_, type, simulationRunStats){
        this.p = p;
        this.l = l;
        this.dna = dna_;
        this.type = type;
        this.simulationRunStats = simulationRunStats;

        this.position = l.copy();  // Location
        this.xoff = p.random(1000);  // For perlin noise
        this.yoff = p.random(1000);
        this.simulationRunStats = simulationRunStats;
        this.currentVelocity = {};

        // DNA will determine size and maxspeed
        // The bigger the creature, the slower it is
        this.maxspeed = p.map(this.dna.genes[0], 0, 1, 15, 0);
        this.r = p.map(this.dna.genes[0], 0, 1, 0, 50);
    }

    run() {
        this.update();
        this.borders();
        this.display();
    };

    // A creature can find food and eat it
    eat(f) {
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

    // Method to display
    display() {
        /*
        p.ellipseMode(p.CENTER);
        p.stroke(0,255);

        p.ellipse(this.position.x, this.position.y, this.r, this.r);
*/
        this.p.rectMode(this.p.CORNER);
        var healthBarWidth = this.r * 2;
        var healthPercent = this.health / 200;

        // Clamp the health bar to not be longer than 100%
        if(healthPercent > 1){
            healthPercent = 1;
        }

        this.p.noFill();
        this.p.rect(this.position.x - this.r,this.position.y - this.r, healthBarWidth, 8);
        this.p.fill(255, this.health, 0, 255);
        this.p.rect(this.position.x - this.r,this.position.y - this.r, healthBarWidth * healthPercent, 8);

        let image = this.currentVelocity.x > 0 ? this.p.shipRightImg : this.p.shipLeftImg;
        this.p.imageMode(this.p.CENTER);
        this.p.image(image, this.position.x, this.position.y, this.r, this.r);
    };

    // Method to update position
    update() {
        // Simple movement based on perlin noise

        var vx = this.p.map(this.p.noise(this.xoff),0,1,-this.maxspeed,this.maxspeed);
        var vy = this.p.map(this.p.noise(this.yoff),0,1,-this.maxspeed,this.maxspeed);
        this.currentVelocity = this.p.createVector(vx,vy);
        this.xoff += 0.01;
        this.yoff += 0.01;

        this.position.add(this.currentVelocity);
        // Death always looming
        this.health -= 0.2;
    };

    // Wraparound
    borders() {
        if (this.position.x < -this.r){
            this.position.x = this.p.width;
        }
        if (this.position.y < -this.r){
            this.position.y = this.p.height;
        }
        if (this.position.x > this.width){
            this.position.x = 0;
        }
        if (this.position.y > this.height){
            this.position.y = 0;
        }
    };

    // Death
    dead() {
        if (this.health < 0.0) {
            this.simulationRunStats.shipDeaths++;
            return true;
        }

        return false;
    };
}