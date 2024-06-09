package fernandoSolis.report_service.services;

import fernandoSolis.report_service.entities.ReportRepairTypeVehicleTypeEntity;
import fernandoSolis.report_service.repositories.ReportRepairTypeVehicleTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportRepairTypeVehicleTypeService {

    @Autowired
    ReportRepairTypeVehicleTypeRepository reportRepairTypeVehicleTypeRepository;

    public List<ReportRepairTypeVehicleTypeEntity> getReportRepairTypeVehicleTypes() { return reportRepairTypeVehicleTypeRepository.findAll(); }

    public ReportRepairTypeVehicleTypeEntity getById(Long id) { return reportRepairTypeVehicleTypeRepository.findById(id).get(); }

    public ReportRepairTypeVehicleTypeEntity saveEntity(ReportRepairTypeVehicleTypeEntity entity) { return reportRepairTypeVehicleTypeRepository.save(entity); }

    public ReportRepairTypeVehicleTypeEntity updateEntity(ReportRepairTypeVehicleTypeEntity newEntity) { return reportRepairTypeVehicleTypeRepository.save(newEntity); }

    public boolean deleteEntity(Long id) throws Exception{
        try{
            reportRepairTypeVehicleTypeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public List<ReportRepairTypeVehicleTypeEntity> getByMonthAndYear(int month, int year) {
        return reportRepairTypeVehicleTypeRepository.findByMonthAndYear(month, year);
    }
}
