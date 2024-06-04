package fernandoSolis.receipt_service.repositories;

import fernandoSolis.receipt_service.entities.ReceiptRepairsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepairsRepository extends JpaRepository<ReceiptRepairsEntity, Long>{

    List<ReceiptRepairsEntity> findByReceiptId(Long receiptId);
}
