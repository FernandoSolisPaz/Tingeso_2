package fernandoSolis.report_service.controllers;


import fernandoSolis.report_service.entities.ReportRepairTypeVehicleTypeEntity;
import fernandoSolis.report_service.services.ReportRepairTypeVariationService;
import fernandoSolis.report_service.services.ReportRepairTypeVehicleTypeService;
import fernandoSolis.report_service.entities.ReportRepairTypeVariationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    ReportRepairTypeVehicleTypeService reportRepairTypeVehicleTypeService;
    @Autowired
    ReportRepairTypeVariationService reportRepairTypeVariationService;

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

    @GetMapping("/RepTypeVehType/Month/{month}/Year/{year}/RepairName/{name}")
    public ResponseEntity<Integer> check(@PathVariable int month, @PathVariable int year, @PathVariable String name){
        return ResponseEntity.ok(reportRepairTypeVehicleTypeService.check(month, year, name));
    }

    @PostMapping("/RepTypeVehType/Month/{month}/Year/{year}/RepairName/{name}")
    public ResponseEntity<Boolean> saveReport(@PathVariable int month, @PathVariable int year, @PathVariable String name){
        ReportRepairTypeVehicleTypeEntity report = new ReportRepairTypeVehicleTypeEntity();
        report.setMonth(month);
        report.setYear(year);
        report.setRepairName(name);
        report.setSedanCount(0);
        report.setHatchbackCount(0);
        report.setSuvCount(0);
        report.setPickupCount(0);
        report.setFurgonetaCount(0);
        report.setSedanTotalAmount(0);
        report.setHatchbackTotalAmount(0);
        report.setSuvTotalAmount(0);
        report.setPickupTotalAmount(0);
        report.setFurgonetaTotalAmount(0);
        report.setTotalAmount(0);
        report.setTotalCount(0);
        ReportRepairTypeVehicleTypeEntity reportNew = reportRepairTypeVehicleTypeService.saveEntity(report);
        return ResponseEntity.ok(true);
    }

    @PutMapping("/RepTypeVehType/Month/{month}/Year/{year}/RepairName/{name}/Type/{id}/Cost/{cost}")
    public ResponseEntity<ReportRepairTypeVehicleTypeEntity> updateReport(@PathVariable int month, @PathVariable int year, @PathVariable String name, @PathVariable int id, @PathVariable int cost){
        ReportRepairTypeVehicleTypeEntity reportUpdated = reportRepairTypeVehicleTypeService.updateEntity(month, year,name, id, cost);
        return ResponseEntity.ok(reportUpdated);
    }

    @DeleteMapping("/RepTypeVehType/{id}")
    public ResponseEntity<Boolean> deleteReport(@PathVariable Long id) throws Exception{
        var isDeleted = reportRepairTypeVehicleTypeService.deleteEntity(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/RepTypeVar/")
    public ResponseEntity<List<ReportRepairTypeVariationEntity>> getAllRepTypeVariation(){
        List<ReportRepairTypeVariationEntity> reports = reportRepairTypeVariationService.getAll();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/RepTypeVar/Generate/Month/{month}/Year/{year}")
    public ResponseEntity<List<ReportRepairTypeVariationEntity>> getRepTypeVariationGenerate(@PathVariable int month, @PathVariable int year){
        List<ReportRepairTypeVariationEntity> reports = reportRepairTypeVariationService.getReportRepairTypeVariation(month, year);
        return ResponseEntity.ok(reports);
    }
}
