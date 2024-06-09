package fernandoSolis.report_service.controllers;


import fernandoSolis.report_service.entities.ReportRepairTypeVehicleTypeEntity;
import fernandoSolis.report_service.services.ReportRepairTypeVehicleTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    ReportRepairTypeVehicleTypeService reportRepairTypeVehicleTypeService;

    @GetMapping("/RepTypeVehType/")
    public ResponseEntity<List<ReportRepairTypeVehicleTypeEntity>> getAllRepTypeVehType(){
        List<ReportRepairTypeVehicleTypeEntity> reports = reportRepairTypeVehicleTypeService.getReportRepairTypeVehicleTypes();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/RepTypeVehType/{id}")
    public ResponseEntity<ReportRepairTypeVehicleTypeEntity> getRepTypeVehTypeById(@PathVariable Long id){
        ReportRepairTypeVehicleTypeEntity report = reportRepairTypeVehicleTypeService.getById(id);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/RepTypeVehType/Month/{month}/Year/{year}")
    public ResponseEntity<List<ReportRepairTypeVehicleTypeEntity>> getByMonthAndYear(@PathVariable int month, @PathVariable int year){
        List<ReportRepairTypeVehicleTypeEntity> reports = reportRepairTypeVehicleTypeService.getByMonthAndYear(month, year);
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/RepTypeVehType/")
    public ResponseEntity<ReportRepairTypeVehicleTypeEntity> saveReport(@RequestBody ReportRepairTypeVehicleTypeEntity report){
        ReportRepairTypeVehicleTypeEntity reportNew = reportRepairTypeVehicleTypeService.saveEntity(report);
        return ResponseEntity.ok(reportNew);
    }

    @PutMapping("/RepTypeVehType/")
    public ResponseEntity<ReportRepairTypeVehicleTypeEntity> updateReport(@RequestBody ReportRepairTypeVehicleTypeEntity report){
        ReportRepairTypeVehicleTypeEntity reportUpdated = reportRepairTypeVehicleTypeService.updateEntity(report);
        return ResponseEntity.ok(reportUpdated);
    }

    @DeleteMapping("/RepTypeVehType/{id}")
    public ResponseEntity<Boolean> deleteReport(@PathVariable Long id) throws Exception{
        var isDeleted = reportRepairTypeVehicleTypeService.deleteEntity(id);
        return ResponseEntity.noContent().build();
    }
}
