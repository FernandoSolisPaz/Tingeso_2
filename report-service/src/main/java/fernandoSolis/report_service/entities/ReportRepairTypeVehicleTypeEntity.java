package fernandoSolis.report_service.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "report_repair_type_vehicle_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportRepairTypeVehicleTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    @Column (name = "repairName")
    private String repairName;

    @Column (name = "sedanCount")
    private int sedanCount;

    @Column (name = "hatchbackCount")
    private int hatchbackCount;

    @Column (name = "suvCount")
    private int suvCount;

    @Column (name = "pickupCount")
    private int pickupCount;

    @Column (name = "furgonetaCount")
    private int furgonetaCount;

    @Column (name = "sedanTotalAmount")
    private int sedanTotalAmount;

    @Column (name = "hatchbackTotalAmount")
    private int hatchbackTotalAmount;

    @Column (name = "suvTotalAmount")
    private int suvTotalAmount;

    @Column (name = "pickupTotalAmount")
    private int pickupTotalAmount;

    @Column (name = "furgonetaTotalAmount")
    private int furgonetaTotalAmount;

    @Column (name = "TotalCount")
    private int TotalCount;

    @Column (name = "TotalAmount")
    private int TotalAmount;

    @Column (name = "month")
    private int month;

    @Column (name = "year")
    private int year;

}
