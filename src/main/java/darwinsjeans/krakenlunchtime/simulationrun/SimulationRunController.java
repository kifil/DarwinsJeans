package darwinsjeans.krakenlunchtime.simulationrun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SimulationRunController {

    //needs dependency injection
    @Autowired
    private SimulationRunService simulationRunService;

    @RequestMapping("/simruns")
    public List<SimulationRun> getAllSimRuns(){
        //automatically converts to JSON since its a rest controller
        return simulationRunService.getAllSimRuns();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/simruns")
    //request will have json of a simulationRun
    public void addSimRun(@RequestBody SimulationRun simRun){
        simulationRunService.addSimRun(simRun);
    }
}