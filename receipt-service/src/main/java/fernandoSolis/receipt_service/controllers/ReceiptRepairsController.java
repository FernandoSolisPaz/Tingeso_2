package fernandoSolis.receipt_service.controllers;

import fernandoSolis.receipt_service.entities.ReceiptRepairsEntity;
import fernandoSolis.receipt_service.services.ReceiptRepairsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receiptsRepairs")
public class ReceiptRepairsController {
    @Autowired
    ReceiptRepairsService receiptRepairsService;

    @GetMapping("/")
    public ResponseEntity<List<ReceiptRepairsEntity>> listReceiptRepairs() {
        List<ReceiptRepairsEntity> receiptrepairsList = receiptRepairsService.getReceiptRepairs();
        return ResponseEntity.ok(receiptrepairsList);
    }

    @GetMapping("/byReceipt/{id}")
    public ResponseEntity<List<ReceiptRepairsEntity>> getReceiptRepairListByReceiptId (@PathVariable Long id) {
        List<ReceiptRepairsEntity> receiptrepairsList = receiptRepairsService.getByReceiptId(id);
        return ResponseEntity.ok(receiptrepairsList);
    }

    @PostMapping("/")
    public ResponseEntity<ReceiptRepairsEntity> saveReceiptRepair(@RequestBody ReceiptRepairsEntity receiptRepair){
        ReceiptRepairsEntity receiptRepairNew = receiptRepairsService.saveReceiptRepairs(receiptRepair);
        return ResponseEntity.ok(receiptRepairNew);
    }

    @PutMapping("/")
    public ResponseEntity<ReceiptRepairsEntity> updateReceiptRepairs(@RequestBody ReceiptRepairsEntity receiptRepair) {
        ReceiptRepairsEntity receiptRepairUpdated = receiptRepairsService.updateReceiptRepairs(receiptRepair);
        return ResponseEntity.ok(receiptRepairUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteReceiptRepairsById(@PathVariable Long id) throws Exception {
        var isDeleted = receiptRepairsService.deleteReceiptRepairs(id);
        return ResponseEntity.noContent().build();
    }
}
