package fernandoSolis.repair_service.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "repairs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepairsEntity {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "repairId")
    private Long repairId;

    @Column(name = "repairName")
    private String repairName;

    @Column(name = "typeOfMotor")
    private int typeOfMotor;

    @Column(name = "costOfRepair")
    private int costOfRepair;
}
