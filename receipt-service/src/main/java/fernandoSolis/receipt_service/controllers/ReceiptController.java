package fernandoSolis.receipt_service.controllers;

import fernandoSolis.receipt_service.entities.Car_brandEntity;
import fernandoSolis.receipt_service.entities.ReceiptEntity;
import fernandoSolis.receipt_service.entities.ReceiptRepairsEntity;
import fernandoSolis.receipt_service.services.ReceiptService;
import fernandoSolis.receipt_service.services.Car_brandService;
import fernandoSolis.receipt_service.services.ReceiptRepairsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/administrate")
public class ReceiptController {
    @Autowired
    Car_brandService car_BrandService;
    @Autowired
    ReceiptRepairsService receiptRepairsService;
    @Autowired
    ReceiptService receiptService;

    @GetMapping("/receipt/")
    public ResponseEntity<List<ReceiptEntity>> listReceipts() {
        List<ReceiptEntity> receipt = receiptService.getReceipts();
        return ResponseEntity.ok(receipt);
    }

    @GetMapping("/receipt/{id}")
    public ResponseEntity<ReceiptEntity> getReceiptById(@PathVariable Long id) {
        ReceiptEntity receipt = receiptService.getReceiptById(id);
        return ResponseEntity.ok(receipt);
    }

    @GetMapping("/receipt/byPlate/{plate}")
    public ResponseEntity<List<ReceiptEntity>> getReceiptByCarPlate(@PathVariable String plate) {
        List<ReceiptEntity> receipts = receiptService.getReceiptByCarPlate(plate);
        return ResponseEntity.ok(receipts);
    }

    @PostMapping("/receipt/")
    public ResponseEntity<ReceiptEntity> saveReceipt(@RequestBody ReceiptEntity receipt, @RequestParam("repairIds") List<Integer> repairIds) {
        ReceiptEntity receiptNew = receiptService.saveReceipt(receipt, repairIds);
        return ResponseEntity.ok(receiptNew);
    }

    @PutMapping("/receipt/")
    public ResponseEntity<ReceiptEntity> updateReceipt(@RequestBody ReceiptEntity repair) {
        ReceiptEntity repairUpdated = receiptService.updateReceipt(repair);
        return ResponseEntity.ok(repairUpdated);
    }

    @PutMapping("/receipt/modify_out_date/{id}")
    public ResponseEntity<ReceiptEntity> mod_out_dates(@PathVariable Long id, @RequestParam("workshopOutDate") LocalDate workshopOutDate, @RequestParam("workshopOutHour") LocalTime workshopOutHour) {
        LocalTime dummy = workshopOutHour;
        ReceiptEntity moddedReceipt = receiptService.modifyOutDatesReceipt(id, workshopOutDate, dummy);
        return ResponseEntity.ok(moddedReceipt);
    }

    @PutMapping("/receipt/modify_pickUp_date/{id}")
    public ResponseEntity<ReceiptEntity> mod_pickUp_dates(@PathVariable Long id, @RequestParam("pickUpDate") LocalDate pickUpDate, @RequestParam("pickUpHour") LocalTime pickUpHour) {
        ReceiptEntity moddedReceipt = receiptService.modifyPickUpDatesReceipt(id, pickUpDate, pickUpHour);
        return ResponseEntity.ok(moddedReceipt);
    }

    @DeleteMapping("/receipt/{id}")
    public ResponseEntity<Boolean> deleteReceiptById(@PathVariable Long id) throws Exception {
        var isDeleted = receiptService.deleteReceipt(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/car_brand/")
    public ResponseEntity<List<Car_brandEntity>> listCar_brands() {
        List<Car_brandEntity> car_brands = car_BrandService.getCarBrand();
        return ResponseEntity.ok(car_brands);
    }

    @GetMapping("/car_brand/{id}")
    public ResponseEntity<Car_brandEntity> getCarBrandById(@PathVariable Long id) {
        Car_brandEntity car_brand = car_BrandService.getCarBrandById(id);
        return ResponseEntity.ok(car_brand);
    }

    @PostMapping("/car_brand/")
    public ResponseEntity<Car_brandEntity> saveCarBrand(@RequestBody Car_brandEntity car_brand) {
        Car_brandEntity car_brandNew = car_BrandService.saveCarBrand(car_brand);
        return ResponseEntity.ok(car_brandNew);
    }

    @PutMapping("/car_brand/")
    public ResponseEntity<Car_brandEntity> updateCarBrand(@RequestBody Car_brandEntity car_brand) {
        Car_brandEntity car_brandUpdated = car_BrandService.updateCarBrand(car_brand);
        return ResponseEntity.ok(car_brandUpdated);
    }

    @DeleteMapping("/car_brand/{id}")
    public ResponseEntity<Boolean> deleteCarBrandById(@PathVariable Long id) throws Exception {
        var isDeleted = car_BrandService.deleteCarBrand(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/receiptsRepairs/")
    public ResponseEntity<List<ReceiptRepairsEntity>> listReceiptRepairs() {
        List<ReceiptRepairsEntity> receiptrepairsList = receiptRepairsService.getReceiptRepairs();
        return ResponseEntity.ok(receiptrepairsList);
    }

    @GetMapping("/receiptsRepairs/byReceipt/{id}")
    public ResponseEntity<List<ReceiptRepairsEntity>> getReceiptRepairListByReceiptId (@PathVariable Long id) {
        List<ReceiptRepairsEntity> receiptrepairsList = receiptRepairsService.getByReceiptId(id);
        return ResponseEntity.ok(receiptrepairsList);
    }

    @PostMapping("/receiptsRepairs/")
    public ResponseEntity<ReceiptRepairsEntity> saveReceiptRepair(@RequestBody ReceiptRepairsEntity receiptRepair){
        ReceiptRepairsEntity receiptRepairNew = receiptRepairsService.saveReceiptRepairs(receiptRepair);
        return ResponseEntity.ok(receiptRepairNew);
    }

    @PutMapping("/receiptsRepairs/")
    public ResponseEntity<ReceiptRepairsEntity> updateReceiptRepairs(@RequestBody ReceiptRepairsEntity receiptRepair) {
        ReceiptRepairsEntity receiptRepairUpdated = receiptRepairsService.updateReceiptRepairs(receiptRepair);
        return ResponseEntity.ok(receiptRepairUpdated);
    }

    @DeleteMapping("/receiptsRepairs/{id}")
    public ResponseEntity<Boolean> deleteReceiptRepairsById(@PathVariable Long id) throws Exception {
        var isDeleted = receiptRepairsService.deleteReceiptRepairs(id);
        return ResponseEntity.noContent().build();
    }
}
