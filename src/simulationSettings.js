export default class SimulationSettings {
    krakenCount = 0;
    shipCount = 0;
    fishCount = 0;
    healthLimit = 0;
    foodRate = 0;
    mutationRate = 0;

    constructor(krakenCount, shipCount, fishCount, healthLimit, foodRate, mutationRate){
        if(krakenCount){
            this.krakenCount = krakenCount;
        }
        if(shipCount){
            this.shipCount = shipCount;
        }
        if(fishCount){
            this.fishCount = fishCount;
        }
        if(healthLimit){
            this.healthLimit = healthLimit;
        }
        if(foodRate){
            this.foodRate = foodRate;
        }
        if(mutationRate){
            this.mutationRate = mutationRate;
        }
    }
}