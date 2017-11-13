export default class Creature {
    type = 'creature';
    health = -1;
    position = {};
    xoff = 0;
    yoff = 0;
    dna = {};   // DNA
    simulationRunStats = {};
    currentVelocity = {};

    constructor(p, l, dna_, simulationRunStats, simulationSettings){
        this.p = p;
        this.l = l;
        this.dna = dna_;
        this.simulationRunStats = simulationRunStats;
        this.simulationSettings = simulationSettings;

        this.position = l.copy();  // Location
        this.xoff = p.random(1000);  // For perlin noise
        this.yoff = p.random(1000);
        this.currentVelocity = {};

        // DNA will determine size and maxspeed
        // The bigger the creature, the slower it is
        this.maxspeed = p.map(this.dna.genes["Speed-Size"], 0, 1, 15, 0);
        this.r = p.map(this.dna.genes["Speed-Size"], 0, 1, 0, 50);
    }

    run() {
        this.update();
        this.borders();
        this.display();
    };

    eat(foodArray){
        // Not implemented
    };

    // Method to display
    display() {
        /*
        p.ellipseMode(p.CENTER);
        p.stroke(0,255);

        p.ellipse(this.position.x, this.position.y, this.r, this.r);
*/
        this.displayHealthBar();

        let image = this.getDisplayImage();
        this.p.imageMode(this.p.CENTER);
        this.p.image(image, this.position.x, this.position.y, this.r, this.r);
    };

    displayHealthBar(){
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
    }

    getDisplayImage(){
        // Not implemented
    };

    // Method to update position
    update() {
        this.move();
        this.age();
    };

    move(){
        // Simple movement based on perlin noise
        var vx = this.p.map(this.p.noise(this.xoff),0,1,-this.maxspeed,this.maxspeed);
        var vy = this.p.map(this.p.noise(this.yoff),0,1,-this.maxspeed,this.maxspeed);
        this.currentVelocity = this.p.createVector(vx,vy);
        this.xoff += 0.01;
        this.yoff += 0.01;
        this.position.add(this.currentVelocity);
    };

    age(){
        this.health -= this.dna.genes["Aging-Fertility"];
    };

    // Movement wraparound
    borders() {
        if (this.position.x < -this.r){
            this.position.x = this.p.width;
        }else if (this.position.y < -this.r){
            this.position.y = this.p.height-this.r;
        }else if (this.position.x > this.p.width+this.r){
            this.position.x = -this.r;
        }else if (this.position.y > this.p.height+this.r){
            this.position.y = -this.r;
        }
    };

    spawn(){
        // Not implemented
    };

    dead() {
        // Not implemented
        return false;
    };
}