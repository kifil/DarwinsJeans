package darwinsjeans.krakenlunchtime.simulationrun;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SimulationRunRepository extends CrudRepository<SimulationRun,String> {

    public List<SimulationRun> findAllByOrderByIdDesc();
}
