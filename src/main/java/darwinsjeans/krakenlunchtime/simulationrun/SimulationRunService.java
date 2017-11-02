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


    public List<SimulationRun> getAllSimRuns(Integer maxRuns){
        //Integer maxRuns = null;

        List<SimulationRun> simRuns = new ArrayList<>();
        simulationRunRepository.findAllByOrderByIdDesc()
                .forEach(simRuns::add);
//        simulationRunRepository.findAll()
//            .forEach(simRuns::add);

        if(maxRuns != null){
            simRuns = simRuns.subList(0,maxRuns > simRuns.size() ? simRuns.size() : maxRuns);
        }

        return simRuns;
    }

    public List<SimulationRun> getLastSixSimRuns(){
        //Integer maxRuns = null;

        List<SimulationRun> simRuns = new ArrayList<>();
        simulationRunRepository.findFirst6ByOrderByIdDesc()
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
