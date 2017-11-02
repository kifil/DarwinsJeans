import p5 from 'p5'

export default function Food(p, num) {
    // Start with some food
    this.food = [];
    for (var i = 0; i < num; i++) {
        this.food.push(p.createVector(p.random(p.width),p.random(p.height)));
    }

    // Add some food at a location
    this.add = function(l) {
        this.food.push(l.copy());
    };

    // Display the food
    this.run = function() {
        for (var i = 0; i < this.food.length; i++) {
            var f = this.food[i];
            //p.rectMode(p.CENTER);
            //p.stroke(0);
            //p.fill(127);
            //p.rect(f.x,f.y,8,8);
            p.imageMode(p.CENTER);
            p.image(p.fishImg, f.x, f.y, 16, 16);
        }

        // There's a small chance food will appear randomly
        if (p.random(1) < 0.01) {
            this.food.push(p.createVector(p.random(p.width),p.random(p.height)));
        }
    };

    // Return the list of food
    this.getFood = function() {
        return this.food;
    }
}
