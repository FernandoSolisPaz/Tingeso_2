package fernandoSolis.report_service.services;


import fernandoSolis.report_service.entities.ReportRepairTypeVariationEntity;
import fernandoSolis.report_service.entities.ReportRepairTypeVehicleTypeEntity;
import fernandoSolis.report_service.repositories.ReportRepairTypeVariationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportRepairTypeVariationService {

    @Autowired
    ReportRepairTypeVehicleTypeService reportRepairTypeVehicleTypeService;
    @Autowired
    ReportRepairTypeVariationRepository reportRepairTypeVariationRepository;
    @Autowired
    RestTemplate restTemplate;

    public List<ReportRepairTypeVariationEntity> getReportRepairTypeVariation(int month, int year) {
        int actual_month = month;
        int actual_year = year;
        int prev_month;
        int year_prev_month;
        int prev_month2;
        int year_prev_month2;
        if(actual_month == 1){
            prev_month = 12;
            year_prev_month = year - 1;
            prev_month2 = 11;
            year_prev_month2 = year - 1;
        } else if(actual_month == 2){
            prev_month = 1;
            year_prev_month = year;
            prev_month2 = 12;
            year_prev_month2 = year - 1;
        } else {
            prev_month = actual_month - 1;
            year_prev_month = actual_year;
            prev_month2 = actual_month - 2;
            year_prev_month2 = actual_year;
        }
        reportRepairTypeVariationRepository.deleteAll();
        List<String> repairNames = restTemplate.getForObject("http://repair-service/repairs/Names/", List.class);
        List<ReportRepairTypeVariationEntity> reportRepairTypeVariationEntities = new ArrayList<>(repairNames.size());
        for(String repairName: repairNames){
            ReportRepairTypeVariationEntity dummy = new ReportRepairTypeVariationEntity();
            if(reportRepairTypeVehicleTypeService.check(actual_month, actual_year, repairName) == 1){
                ReportRepairTypeVehicleTypeEntity reportInfo = reportRepairTypeVehicleTypeService.getByMonthAndYearAndRepairName(actual_month,actual_year,repairName);
                dummy.setRepairName(repairName);
                dummy.setActualMonthAmount(reportInfo.getTotalAmount());
                dummy.setActualMonthCount(reportInfo.getTotalCount());
            } else{
                dummy.setRepairName(repairName);
                dummy.setActualMonthAmount(0);
                dummy.setActualMonthCount(0);
            }
            if(reportRepairTypeVehicleTypeService.check(prev_month, year_prev_month, repairName) == 1){
                ReportRepairTypeVehicleTypeEntity reportInfo = reportRepairTypeVehicleTypeService.getByMonthAndYearAndRepairName(prev_month,year_prev_month,repairName);
                dummy.setPrevMonthAmount(reportInfo.getTotalAmount());
                dummy.setPrevMonthCount(reportInfo.getTotalCount());
            } else{
                dummy.setPrevMonthAmount(0);
                dummy.setPrevMonthCount(0);
            }
            if(reportRepairTypeVehicleTypeService.check(prev_month2, year_prev_month2, repairName) == 1){
                ReportRepairTypeVehicleTypeEntity reportInfo = reportRepairTypeVehicleTypeService.getByMonthAndYearAndRepairName(prev_month2,year_prev_month2,repairName);
                dummy.setPrev2MonthAmount(reportInfo.getTotalAmount());
                dummy.setPrev2MonthCount(reportInfo.getTotalCount());
            } else {
                dummy.setPrev2MonthAmount(0);
                dummy.setPrev2MonthCount(0);
            }
            if(dummy.getActualMonthAmount() != 0 && dummy.getPrevMonthAmount() != 0){
                if(dummy.getActualMonthAmount()>dummy.getPrevMonthAmount()){
                    dummy.setVariationActualVsPrevMonthAmount((dummy.getActualMonthAmount()/dummy.getPrevMonthAmount())*100 - 100);
                } else {
                    dummy.setVariationActualVsPrevMonthAmount(((dummy.getPrevMonthAmount()/dummy.getActualMonthAmount())*100 - 100)*-1);
                }
            } else {
                dummy.setVariationActualVsPrevMonthAmount(-0.00001f);
            }
            if(dummy.getActualMonthCount() != 0 && dummy.getPrevMonthCount() != 0){
                if(dummy.getActualMonthCount()>dummy.getPrevMonthCount()){
                    dummy.setVariationActualVsPrevMonthCount((dummy.getActualMonthCount()/dummy.getPrevMonthCount())*100 - 100);
                } else {
                    dummy.setVariationActualVsPrevMonthCount(((dummy.getPrevMonthCount()/dummy.getActualMonthCount())*100 - 100)*-1);
                }
            } else {
                dummy.setVariationActualVsPrevMonthCount(-0.00001f);
            }
            if(dummy.getPrev2MonthAmount() != 0 && dummy.getPrevMonthAmount() != 0){
                if(dummy.getPrevMonthAmount()>dummy.getPrev2MonthAmount()){
                    dummy.setVariationPrevMonthVsPrev2MonthAmount((dummy.getPrevMonthAmount()/dummy.getPrev2MonthAmount())*100 - 100);
                } else {
                    dummy.setVariationPrevMonthVsPrev2MonthAmount(((dummy.getPrev2MonthAmount()/dummy.getPrevMonthAmount())*100 - 100)*-1);
                }
            } else {
                dummy.setVariationPrevMonthVsPrev2MonthAmount(-0.00001f);
            }
            if(dummy.getPrev2MonthCount() != 0 && dummy.getPrevMonthCount() != 0){
                if(dummy.getPrevMonthCount()>dummy.getPrev2MonthCount()){
                    dummy.setVariationPrevMonthVsPrev2MonthCount((dummy.getPrevMonthCount()/dummy.getPrev2MonthCount())*100 - 100);
                } else {
                    dummy.setVariationPrevMonthVsPrev2MonthCount(((dummy.getPrev2MonthCount()/dummy.getPrevMonthCount())*100 - 100)*-1);
                }
            } else {
                dummy.setVariationPrevMonthVsPrev2MonthCount(-0.00001f);
            }
            reportRepairTypeVariationEntities.add(dummy);
            reportRepairTypeVariationRepository.save(dummy);
        }
        return reportRepairTypeVariationEntities;
    }

    public List<ReportRepairTypeVariationEntity> getAll(){
        return reportRepairTypeVariationRepository.findAll();
    }
}
