package fernandoSolis.receipt_service.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import jakarta.persistence.*;

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
}
