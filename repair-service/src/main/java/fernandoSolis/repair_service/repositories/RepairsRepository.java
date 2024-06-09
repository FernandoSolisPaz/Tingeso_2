package fernandoSolis.repair_service.repositories;

import fernandoSolis.repair_service.entities.RepairsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairsRepository extends JpaRepository<RepairsEntity, Long>{

    @Query(value = "Select r FROM RepairsEntity r WHERE r.typeOfMotor = :typeOfMotor AND r.repairName = :Repair_name")
    public RepairsEntity findByMotorAndRepairName(@Param("typeOfMotor") int typeOfMotor, @Param("Repair_name") String Repair_name);

    @Query(value = "Select r FROM RepairsEntity  r WHERE r.typeOfMotor = :typeOfMotor")
    List<RepairsEntity> findByTypeOfMotor(@Param("typeOfMotor") int typeOfMotor);

    @Query(value = "SELECT DISTINCT r.repairName FROM RepairsEntity r")
    List<String> findAllRepairNames();

}
