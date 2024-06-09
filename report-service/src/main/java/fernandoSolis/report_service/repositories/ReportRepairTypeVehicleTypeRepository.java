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

    @Query(value = "SELECT CASE WHEN EXISTS (SELECT 1 FROM ReportRepairTypeVehicleTypeEntity r WHERE r.month = :month AND r.year = :year AND r.repairName = :name) THEN 1 ELSE 0 END AS resultado")
    public int check(@Param("month") int month, @Param("year") int year, @Param("name") String name);

    @Query(value = "SELECT r FROM ReportRepairTypeVehicleTypeEntity r WHERE r.month = :month AND r.year = :year AND r.repairName = :name")
    public ReportRepairTypeVehicleTypeEntity findByNameAndMonthAndYear(@Param("month") int month, @Param("year") int year, @Param("name") String name);
}
