package darwinsjeans.krakenlunchtime.simulationrun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//marks this as a singleton service
@Service
public class SimulationRunService {

    //for dependency injection
    @Autowired
    private SimulationRunRepository simulationRunRepository;


    public List<SimulationRun> getAllSimRuns(){
        List<SimulationRun> simRuns = new ArrayList<>();
        simulationRunRepository.findAll()
            .forEach(simRuns::add);
        return simRuns;
    }

    public SimulationRun getSimRun(String id){
        return simulationRunRepository.findOne(id);
    }

    public void addSimRun(SimulationRun simRun){
        simulationRunRepository.save(simRun);
    }
}
