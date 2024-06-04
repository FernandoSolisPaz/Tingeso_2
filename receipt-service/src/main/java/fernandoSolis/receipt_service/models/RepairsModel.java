package fernandoSolis.receipt_service.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepairsModel {

    private Long repairId;

    private String repairName;

    private int typeOfMotor;

    private int costOfRepair;
}
