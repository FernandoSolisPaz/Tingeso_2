package fernandoSolis.receipt_service.repositories;

import fernandoSolis.receipt_service.entities.ReceiptEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<ReceiptEntity, Long> {

    List<ReceiptEntity> findByCarPlate(String carPlate);

    @Query(value = "SELECT COUNT(re) FROM Receipt re WHERE re.car_plate = :car_plate AND re.workshop_in_date >= CURRENT_DATE - INTERVAL '12 months'", nativeQuery = true)
    int countReceiptEntitiesByNumberOfRepairsIn12Months(@Param("car_plate") String car_plate);

}
