package fernandoSolis.report_service.repositories;

import fernandoSolis.report_service.entities.ReportRepairTypeVehicleTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepairTypeVehicleTypeRepository  extends JpaRepository<ReportRepairTypeVehicleTypeEntity, Long> {

    @Query(value = "Select r FROM ReportRepairTypeVehicleTypeEntity r WHERE r.month = :month AND r.year = :year")
    List<ReportRepairTypeVehicleTypeEntity> findByMonthAndYear(@Param("month") int month, @Param("year") int year);
}
