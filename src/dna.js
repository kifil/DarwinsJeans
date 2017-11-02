// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>

// Class to describe DNA
// Has more features for two parent mating (not used in this example)

// Constructor (makes a random DNA)
export default function DNA(p, newGenes) {
    this.genesList = ["Speed-Size","Carrots"];

    if (newGenes) {
        this.genes = newGenes;
    } else {
        // The genetic sequence
        // DNA is random floating point values between 0 and 1 (!!)
        this.genes = {};
        for (var i = 0; i < this.genesList.length; i++) {
            var geneName = this.genesList[i];
            this.genes[geneName] =  p.random(0,1);
        }
    }

    this.copy = function() {
        // should switch to fancy JS array copy
        var newGenes = {};
        for (var key in this.genes) {
            newGenes[key] = this.genes[key];
        }

        return new DNA(p, newGenes);
    }

    // Based on a mutation probability, picks a new random character in array spots
    this.mutate = function(mutationRate) {
        for (var key in this.genes) {
            if (p.random(1) < mutationRate) {
                console.log("I mutated", mutationRate);
                this.genes[key] = p.random(0,1);
            }
        }
    }
}
