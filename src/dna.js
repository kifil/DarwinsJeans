// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>

// Class to describe DNA
// Has more features for two parent mating (not used in this example)


// Constructor (makes a random DNA)
export default function DNA(p, newgenes) {
    if (newgenes) {
        this.genes = newgenes;
    } else {
        // The genetic sequence
        // DNA is random floating point values between 0 and 1 (!!)
        this.genes = new Array(1);
        for (var i = 0; i < this.genes.length; i++) {
            this.genes[i] = p.random(0,1);
        }
    }

    this.copy = function() {
        // should switch to fancy JS array copy
        var newgenes = [];
        for (var i = 0; i < this.genes.length; i++) {
            newgenes[i] = this.genes[i];
        }

        return new DNA(p, newgenes);
    }

    // Based on a mutation probability, picks a new random character in array spots
    this.mutate = function(m) {
        for (var i = 0; i < this.genes.length; i++) {
            if (p.random(1) < m) {
                this.genes[i] = p.random(0,1);
            }
        }
    }
}
