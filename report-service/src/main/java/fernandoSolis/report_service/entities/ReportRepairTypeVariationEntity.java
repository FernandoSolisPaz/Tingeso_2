package fernandoSolis.report_service.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "report_repair_type_variation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportRepairTypeVariationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    @Column (name = "repairName")
    private String repairName;

    @Column (name = "actualMonthCount")
    private int actualMonthCount;

    @Column (name = "actualMonthAmount")
    private int actualMonthAmount;

    @Column (name = "variationActualVsPrevMonthCount")
    private float variationActualVsPrevMonthCount;

    @Column (name = "variationActualVsPrevMonthAmount")
    private float variationActualVsPrevMonthAmount;

    @Column (name = "PrevMonthCount")
    private int PrevMonthCount;

    @Column (name = "PrevMonthAmount")
    private int PrevMonthAmount;

    @Column (name = "variationPrevMonthVsPrev2MonthCount")
    private float variationPrevMonthVsPrev2MonthCount;

    @Column (name = "variationPrevMonthVsPrev2MonthAmount")
    private float variationPrevMonthVsPrev2MonthAmount;

    @Column (name = "Prev2MonthCount")
    private int Prev2MonthCount;

    @Column (name = "Prev2MonthAmount")
    private int Prev2MonthAmount;


}
