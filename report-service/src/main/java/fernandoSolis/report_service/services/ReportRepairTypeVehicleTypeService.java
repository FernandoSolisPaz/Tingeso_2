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

    public ReportRepairTypeVehicleTypeEntity updateEntity(int month, int year, String name, int id, int cost) {
        ReportRepairTypeVehicleTypeEntity reportToUpdate = reportRepairTypeVehicleTypeRepository.findByNameAndMonthAndYear(month, year, name);
        if(id == 0){
            reportToUpdate.setSedanTotalAmount(reportToUpdate.getSedanTotalAmount() + cost);
            reportToUpdate.setSedanCount(reportToUpdate.getSedanCount() + 1);
            reportToUpdate.setTotalAmount(reportToUpdate.getTotalAmount() + cost);
            reportToUpdate.setTotalCount(reportToUpdate.getTotalCount() + 1);
        } else if (id == 1) {
            reportToUpdate.setHatchbackTotalAmount(reportToUpdate.getHatchbackTotalAmount() + cost);
            reportToUpdate.setHatchbackCount(reportToUpdate.getHatchbackCount() + 1);
            reportToUpdate.setTotalAmount(reportToUpdate.getTotalAmount() + cost);
            reportToUpdate.setTotalCount(reportToUpdate.getTotalCount() + 1);
        } else if (id == 2) {
            reportToUpdate.setSuvTotalAmount(reportToUpdate.getSuvTotalAmount() + cost);
            reportToUpdate.setSuvCount(reportToUpdate.getSuvCount() + 1);
            reportToUpdate.setTotalAmount(reportToUpdate.getTotalAmount() + cost);
            reportToUpdate.setTotalCount(reportToUpdate.getTotalCount() + 1);
        }else if (id == 3) {
            reportToUpdate.setPickupTotalAmount(reportToUpdate.getPickupTotalAmount() + cost);
            reportToUpdate.setPickupCount(reportToUpdate.getPickupCount() + 1);
            reportToUpdate.setTotalAmount(reportToUpdate.getTotalAmount() + cost);
            reportToUpdate.setTotalCount(reportToUpdate.getTotalCount() + 1);
        } else {
            reportToUpdate.setFurgonetaTotalAmount(reportToUpdate.getFurgonetaTotalAmount() + cost);
            reportToUpdate.setFurgonetaCount(reportToUpdate.getFurgonetaCount() + 1);
            reportToUpdate.setTotalAmount(reportToUpdate.getTotalAmount() + cost);
            reportToUpdate.setTotalCount(reportToUpdate.getTotalCount() + 1);
        }
        return reportRepairTypeVehicleTypeRepository.save(reportToUpdate);
    }

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

    public int check(int month, int year, String name) {
        return reportRepairTypeVehicleTypeRepository.check(month, year, name);
    }
}
