package fernandoSolis.receipt_service.controllers;

import fernandoSolis.receipt_service.entities.Car_brandEntity;
import fernandoSolis.receipt_service.services.Car_brandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car_brand")
@CrossOrigin("*")
public class Car_brandController {
    @Autowired
    Car_brandService car_BrandService;

    @GetMapping("/")
    public ResponseEntity<List<Car_brandEntity>> listCar_brands() {
        List<Car_brandEntity> car_brands = car_BrandService.getCarBrand();
        return ResponseEntity.ok(car_brands);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car_brandEntity> getCarBrandById(@PathVariable Long id) {
        Car_brandEntity car_brand = car_BrandService.getCarBrandById(id);
        return ResponseEntity.ok(car_brand);
    }

    @PostMapping("/")
    public ResponseEntity<Car_brandEntity> saveCarBrand(@RequestBody Car_brandEntity car_brand) {
        Car_brandEntity car_brandNew = car_BrandService.saveCarBrand(car_brand);
        return ResponseEntity.ok(car_brandNew);
    }

    @PutMapping("/")
    public ResponseEntity<Car_brandEntity> updateCarBrand(@RequestBody Car_brandEntity car_brand) {
        Car_brandEntity car_brandUpdated = car_BrandService.updateCarBrand(car_brand);
        return ResponseEntity.ok(car_brandUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCarBrandById(@PathVariable Long id) throws Exception {
        var isDeleted = car_BrandService.deleteCarBrand(id);
        return ResponseEntity.noContent().build();
    }
}
