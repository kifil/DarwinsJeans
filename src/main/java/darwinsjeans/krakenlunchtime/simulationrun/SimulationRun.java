package darwinsjeans.krakenlunchtime.simulationrun;

import javax.persistence.*;

//lets JPA know that this object should map to a table
@Entity
public class SimulationRun {

    public Long getId() {
        return id;
    }

    public Integer getFoodEaten() {
        return foodEaten;
    }

    public Integer getKrakenDeaths() {
        return krakenDeaths;
    }

    public Integer getShipDeaths() {
        return shipDeaths;
    }

    public Integer getMaxPopulationKraken() {
        return maxPopulationKraken;
    }

    public Integer getMaxPopulationShips() {
        return maxPopulationShips;
    }

    public Integer getFinalPopulationKraken() {
        return finalPopulationKraken;
    }

    public Integer getFinalPopulationShips() {
        return finalPopulationShips;
    }

    @Id
    @Column(name = "ID")
    @SequenceGenerator(name="seq")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public void setFoodEaten(Integer foodEaten) {
        this.foodEaten = foodEaten;
    }

    public void setKrakenDeaths(Integer krakenDeaths) {
        this.krakenDeaths = krakenDeaths;
    }

    public void setShipDeaths(Integer shipDeaths) {
        this.shipDeaths = shipDeaths;
    }

    public void setMaxPopulationKraken(Integer maxPopulationKraken) {
        this.maxPopulationKraken = maxPopulationKraken;
    }

    public void setMaxPopulationShips(Integer maxPopulationShips) {
        this.maxPopulationShips = maxPopulationShips;
    }

    public void setFinalPopulationKraken(Integer finalPopulationKraken) {
        this.finalPopulationKraken = finalPopulationKraken;
    }

    public void setFinalPopulationShips(Integer finalPopulationShips) {
        this.finalPopulationShips = finalPopulationShips;
    }

    public Integer getWorldTicks() {
        return worldTicks;
    }

    public void setWorldTicks(Integer worldTicks) {
        this.worldTicks = worldTicks;
    }

    private Integer foodEaten;
    private Integer krakenDeaths;
    private Integer shipDeaths;
    private Integer maxPopulationKraken;
    private Integer maxPopulationShips;
    private Integer finalPopulationKraken;
    private Integer finalPopulationShips;
    private Integer worldTicks;

    public SimulationRun() {
    }

    public SimulationRun(Long id, Integer foodEaten, Integer krakenDeaths, Integer shipDeaths, Integer maxPopulationKraken, Integer maxPopulationShips, Integer finalPopulationKraken, Integer finalPopulationShips, Integer worldTicks) {
        this.id = id;
        this.foodEaten = foodEaten;
        this.krakenDeaths = krakenDeaths;
        this.shipDeaths = shipDeaths;
        this.maxPopulationKraken = maxPopulationKraken;
        this.maxPopulationShips = maxPopulationShips;
        this.finalPopulationKraken = finalPopulationKraken;
        this.finalPopulationShips = finalPopulationShips;
        this.worldTicks = worldTicks;
    }
}
