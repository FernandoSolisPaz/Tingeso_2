package fernandoSolis.receipt_service.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "receipt_repairs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptRepairsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receiptRepairsId")
    private Long receiptRepairsId;

    @Column(name = "receiptId")
    private Long receiptId;

    @Column(name = "repairId")
    private Long repairId;

    @Column (name = "plate")
    private String plate;

    @Column (name = "repairDate")
    private LocalDate repairDate;

    @Column (name = "repairTime")
    private LocalTime repairTime;

    @Column (name = "costOfTheRepair")
    private int costOfTheRepair;

    @Column (name = "nameOfTheRepair")
    private String nameOfTheRepair;
}
