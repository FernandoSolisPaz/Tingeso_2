package fernandoSolis.receipt_service.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarModel {

    private String plate;

    private Long carBrandId;

    private String model;

    /*
     * Sedán = 0
     * Hatchback = 1
     * SUV = 2
     * Pickup = 3
     * Furgoneta = 4
     * */
    private int type;

    private int yearOfFabrication;

    /*
     * Gasolina = 0
     * Diésel = 1
     * Híbrido = 2
     * Eléctrico = 3
     * */
    private int motor;

    private int numberOfSeats;

    private int kilometers;
}
