package fernandoSolis.repair_service.services;

import fernandoSolis.repair_service.entities.RepairsEntity;
import fernandoSolis.repair_service.repositories.RepairsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepairsService {

    @Autowired
    RepairsRepository repairsRepository;

    public List<RepairsEntity> getRepairs(){ return repairsRepository.findAll(); }

    public RepairsEntity saveRepair(RepairsEntity repair){return repairsRepository.save(repair); }

    public RepairsEntity getRepairById(Long id) { return repairsRepository.findById(id).get(); }

    public RepairsEntity updateRepair(RepairsEntity carBrand){ return repairsRepository.save(carBrand); }

    public RepairsEntity getByMotorIdAndRepairName(int id, String name) { return repairsRepository.findByMotorAndRepairName(id, name); }

    public boolean deleteRepair(Long id) throws Exception{
        try{
            repairsRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public List<RepairsEntity> getByMotorId(int id) { return repairsRepository.findByTypeOfMotor(id); }

    public List<String> getAllRepairNames() { return repairsRepository.findAllRepairNames(); }


}
