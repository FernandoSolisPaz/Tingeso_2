package fernandoSolis.receipt_service.services;


import fernandoSolis.receipt_service.entities.Car_brandEntity;
import fernandoSolis.receipt_service.repositories.Car_brandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Car_brandService {
    @Autowired
    Car_brandRepository car_brandRepository;

    public List<Car_brandEntity> getCarBrand(){ return car_brandRepository.findAll(); }

    public Car_brandEntity saveCarBrand(Car_brandEntity carBrand){return car_brandRepository.save(carBrand); }

    public Car_brandEntity getCarBrandById(Long id) { return car_brandRepository.findById(id).get(); }

    public Car_brandEntity updateCarBrand(Car_brandEntity carBrand){ return car_brandRepository.save(carBrand); }

    public boolean deleteCarBrand(Long id) throws Exception{
        try{
            car_brandRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
