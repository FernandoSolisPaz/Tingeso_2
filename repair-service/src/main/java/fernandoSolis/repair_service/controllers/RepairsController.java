package fernandoSolis.repair_service.controllers;

import fernandoSolis.repair_service.entities.RepairsEntity;
import fernandoSolis.repair_service.services.RepairsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/repairs")
@CrossOrigin("*")
public class RepairsController {
    @Autowired
    RepairsService repairsService;

    @GetMapping("/")
    public ResponseEntity<List<RepairsEntity>> listRepairs() {
        List<RepairsEntity> repairs = repairsService.getRepairs();
        return ResponseEntity.ok(repairs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RepairsEntity> getRepairById(@PathVariable Long id) {
        RepairsEntity repair = repairsService.getRepairById(id);
        return ResponseEntity.ok(repair);
    }

    @GetMapping("/motorId/{id}/repairName/{name}")
    public ResponseEntity<RepairsEntity> getRepairByMotorIdAndRepairName(@PathVariable int id, @PathVariable String name) {
        RepairsEntity repair = repairsService.getByMotorIdAndRepairName(id, name);
        return ResponseEntity.ok(repair);
    }

    @PostMapping("/")
    public ResponseEntity<RepairsEntity> saveRepair(@RequestBody RepairsEntity repair) {
        RepairsEntity repairNew = repairsService.saveRepair(repair);
        return ResponseEntity.ok(repairNew);
    }

    @PutMapping("/")
    public ResponseEntity<RepairsEntity> updateRepair(@RequestBody RepairsEntity repair) {
        RepairsEntity repairUpdated = repairsService.updateRepair(repair);
        return ResponseEntity.ok(repairUpdated);
    }

}
