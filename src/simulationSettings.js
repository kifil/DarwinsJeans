export default class SimulationSettings {
    predatorCount = 0
    preyCount = 0
    foodCount = 0
    healthLimit = 0
    foodRate = 0
    mutationRate = 0

    constructor(predatorCount,preyCount,foodCount,healthLimit,foodRate,mutationRate){
        if(predatorCount){
            this.predatorCount = predatorCount;
        }
        if(preyCount){
            this.preyCount = preyCount;
        }
        if(foodCount){
            this.foodCount = foodCount;
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