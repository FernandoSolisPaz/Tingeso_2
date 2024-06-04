package fernandoSolis.receipt_service.services;

import fernandoSolis.receipt_service.entities.ReceiptRepairsEntity;
import fernandoSolis.receipt_service.repositories.ReceiptRepairsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReceiptRepairsService {
    @Autowired
    ReceiptRepairsRepository receiptRepairsRepository;

    public List<ReceiptRepairsEntity> getReceiptRepairs(){ return receiptRepairsRepository.findAll(); }

    public ReceiptRepairsEntity saveReceiptRepairs(ReceiptRepairsEntity receiptRepairs) { return receiptRepairsRepository.save(receiptRepairs); }

    public List<ReceiptRepairsEntity> getByReceiptId(Long receiptId){ return receiptRepairsRepository.findByReceiptId(receiptId); }

    public ReceiptRepairsEntity updateReceiptRepairs(ReceiptRepairsEntity receiptrepair){ return receiptRepairsRepository.save(receiptrepair); }

    public boolean deleteReceiptRepairs(Long id) throws Exception{
        try{
            receiptRepairsRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
