package fernandoSolis.vehicle_service.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Table(name = "car")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarEntity {
    @Id
    @Column(name = "plate")
    private String plate;

    @Column(name = "carBrandId")
    private Long carBrandId;

    @Column(name = "model")
    private String model;

    /*
     * Sedán = 0
     * Hatchback = 1
     * SUV = 2
     * Pickup = 3
     * Furgoneta = 4
     * */
    @Column(name = "type")
    private int type;

    @Column(name = "yearOfFabrication")
    private int yearOfFabrication;

    /*
     * Gasolina = 0
     * Diésel = 1
     * Híbrido = 2
     * Eléctrico = 3
     * */
    @Column(name = "motor")
    private int motor;

    @Column(name = "numberOfSeats")
    private int numberOfSeats;

    @Column(name = "kilometers")
    private int kilometers;
}
