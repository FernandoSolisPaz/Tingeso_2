package fernandoSolis.receipt_service.repositories;

import fernandoSolis.receipt_service.entities.Car_brandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Car_brandRepository extends JpaRepository<Car_brandEntity, Long>{
}
