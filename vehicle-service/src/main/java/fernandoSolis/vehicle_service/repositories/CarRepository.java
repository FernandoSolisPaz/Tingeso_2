package fernandoSolis.vehicle_service.repositories;

import fernandoSolis.vehicle_service.entities.CarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, String> {
}
