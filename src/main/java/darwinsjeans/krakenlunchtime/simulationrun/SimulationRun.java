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

    public Integer getShipsBorn() {
        return shipsBorn;
    }

    public Integer getWorldTicks() {
        return worldTicks;
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

    public void setWorldTicks(Integer worldTicks) {
        this.worldTicks = worldTicks;
    }

    public void setShipsBorn(Integer shipsBorn) {
        this.shipsBorn = shipsBorn;
    }

    public Float getAverageSizeSpeed() {
        return averageSizeSpeed;
    }

    public void setAverageSizeSpeed(Float averageSizeSpeed) {
        this.averageSizeSpeed = averageSizeSpeed;
    }

    private Integer foodEaten;
    private Integer krakenDeaths;
    private Integer shipDeaths;
    private Integer maxPopulationKraken;
    private Integer maxPopulationShips;
    private Integer finalPopulationKraken;
    private Integer finalPopulationShips;
    private Integer shipsBorn;
    private Integer worldTicks;
    private Float averageSizeSpeed;

    public SimulationRun() {
    }

    public SimulationRun(Long id,
                         Integer foodEaten,
                         Integer krakenDeaths,
                         Integer shipDeaths,
                         Integer maxPopulationKraken,
                         Integer maxPopulationShips,
                         Integer finalPopulationKraken,
                         Integer finalPopulationShips,
                         Integer worldTicks,
                         Integer shipsBorn,
                         Float averageSizeSpeed) {
        this.id = id;
        this.foodEaten = foodEaten;
        this.krakenDeaths = krakenDeaths;
        this.shipDeaths = shipDeaths;
        this.maxPopulationKraken = maxPopulationKraken;
        this.maxPopulationShips = maxPopulationShips;
        this.finalPopulationKraken = finalPopulationKraken;
        this.finalPopulationShips = finalPopulationShips;
        this.worldTicks = worldTicks;
        this.shipsBorn = shipsBorn;
        this.averageSizeSpeed = averageSizeSpeed;
    }
}
