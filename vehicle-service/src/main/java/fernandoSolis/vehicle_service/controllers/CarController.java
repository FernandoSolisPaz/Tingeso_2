package fernandoSolis.vehicle_service.controllers;

import fernandoSolis.vehicle_service.entities.CarEntity;
import fernandoSolis.vehicle_service.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin("*")
public class CarController {
    @Autowired
    CarService carService;

    @GetMapping("/")
    public ResponseEntity<List<CarEntity>> listCars() {
        List<CarEntity> cars = carService.getCars();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{plate}")
    public ResponseEntity<CarEntity> getCarByPlate(@PathVariable String plate) {
        CarEntity car = carService.getCarByPlate(plate);
        return ResponseEntity.ok(car);
    }

    @PostMapping("/")
    public ResponseEntity<CarEntity> saveCar(@RequestBody CarEntity car) {
        CarEntity carNew = carService.saveCar(car);
        return ResponseEntity.ok(carNew);
    }

    @PutMapping("/")
    public ResponseEntity<CarEntity> updateCar(@RequestBody CarEntity car) {
        CarEntity carUpdated = carService.updateCar(car);
        return ResponseEntity.ok(carUpdated);
    }

    @DeleteMapping("/{plate}")
    public ResponseEntity<Boolean> deleteCarByPlate(@PathVariable String plate) throws Exception {
        var isDeleted = carService.deleteCar(plate);
        return ResponseEntity.noContent().build();
    }
}
