package fernandoSolis.report_service.repositories;


import fernandoSolis.report_service.entities.ReportRepairTypeVariationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepairTypeVariationRepository extends JpaRepository<ReportRepairTypeVariationEntity,Long> {

}
