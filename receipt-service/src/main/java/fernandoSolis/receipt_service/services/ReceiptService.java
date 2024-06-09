package fernandoSolis.receipt_service.services;

import fernandoSolis.receipt_service.entities.ReceiptEntity;
import fernandoSolis.receipt_service.repositories.ReceiptRepository;
import fernandoSolis.receipt_service.entities.Car_brandEntity;
import fernandoSolis.receipt_service.entities.ReceiptRepairsEntity;
import fernandoSolis.receipt_service.models.RepairsModel;
import fernandoSolis.receipt_service.models.CarModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.*;
import java.util.List;
import java.time.temporal.ChronoUnit;

@Service
public class ReceiptService {

    @Autowired
    ReceiptRepository receiptRepository;
    @Autowired
    ReceiptRepairsService receiptRepairsService;
    @Autowired
    Car_brandService car_brandService;
    @Autowired
    RestTemplate restTemplate;

    public List<ReceiptEntity> getReceipts() { return receiptRepository.findAll(); }

    public ReceiptEntity getReceiptById(Long id) { return receiptRepository.findById(id).get(); }

    public List<ReceiptEntity> getReceiptByCarPlate(String plate){ return receiptRepository.findByCarPlate(plate); }

    public ReceiptEntity updateReceipt(ReceiptEntity receipt){
        float Surcharge_total_amount;
        float Discount_total_amount;
        float IVAAmount;
        float IVA = 0.19f;
        if(receipt.getWorkshopOutDate()!= null && receipt.getWorkshopOutHour() != null && receipt.getPickUpDate() != null && receipt.getPickUpHour() != null){
            LocalDateTime workshopOut = receipt.getWorkshopOutDate().atTime(receipt.getWorkshopOutHour());
            LocalDateTime pickUp = receipt.getPickUpDate().atTime(receipt.getPickUpHour());
            long days_passed_between_out_pickup = ChronoUnit.DAYS.between(workshopOut, pickUp);
            float late_pickup_surcharge = 0.05f * days_passed_between_out_pickup;
            receipt.setDelayOfPickUpSurcharge(late_pickup_surcharge);
        } else if (receipt.getWorkshopOutDate() != null && receipt.getWorkshopOutHour() != null) {
            LocalDateTime workshopOut = receipt.getWorkshopOutDate().atTime(receipt.getWorkshopOutHour());
            LocalDateTime today = LocalDateTime.now();
            long days_passed_between_out_today = ChronoUnit.DAYS.between(workshopOut, today);
            float late_pickup_surcharge = 0.05f * days_passed_between_out_today;
            receipt.setDelayOfPickUpSurcharge(late_pickup_surcharge);
        } else {
            float late_pickup_surcharge = 0;
            receipt.setDelayOfPickUpSurcharge(late_pickup_surcharge);
        }
        int repairsSum = receipt.getCostOfRepair();
        Surcharge_total_amount = repairsSum * receipt.getAgeVehicleSurcharge() + repairsSum * receipt.getKilometersSurcharge() + repairsSum * receipt.getDelayOfPickUpSurcharge();
        receipt.setSurchargeTotalAmount(Surcharge_total_amount);
        Discount_total_amount = receipt.getBrandBond() + repairsSum * receipt.getDayOfAttentionDisc() + repairsSum * receipt.getNumberOfRepairsDisc();
        receipt.setDiscountTotalAmount(Discount_total_amount);
        float cost = (repairsSum - receipt.getBrandBond() - repairsSum * receipt.getDayOfAttentionDisc() - repairsSum * receipt.getNumberOfRepairsDisc() + repairsSum * receipt.getAgeVehicleSurcharge() + repairsSum * receipt.getKilometersSurcharge() + repairsSum * receipt.getDelayOfPickUpSurcharge());
        float totalCost = cost + cost * IVA;
        IVAAmount = cost * IVA;
        receipt.setIvaAmount(IVAAmount);
        receipt.setTotalAmount(totalCost);
        return receiptRepository.save(receipt);
    }

    public ReceiptEntity saveReceipt(ReceiptEntity receipt, List<Integer> repairIds) {

        float[][] matrixRepairs = {
                {0.05f, 0.07f, 0.1f, 0.08f},
                {0.1f, 0.12f, 0.15f, 0.13f},
                {0.15f, 0.17f, 0.2f, 0.18f},
                {0.2f, 0.22f, 0.25f, 0.23f}
        };
        float[][] matrixVehicleOldness = {
                {0.05f, 0.05f, 0.07f, 0.07f, 0.07f},
                {0.09f, 0.09f, 0.11f, 0.11f, 0.11f},
                {0.15f, 0.15f, 0.2f, 0.2f, 0.2f}
        };
        float[][] matrixKilometers = {
                {0.03f, 0.03f, 0.05f, 0.05f, 0.05f},
                {0.07f, 0.07f, 0.09f, 0.09f, 0.09f},
                {0.12f, 0.12f, 0.12f, 0.12f, 0.12f},
                {0.2f, 0.2f, 0.2f, 0.2f, 0.2f}
        };
        ReceiptEntity newReceipt = new ReceiptEntity();

        newReceipt.setWorkshopInDate(LocalDate.now());
        newReceipt.setWorkshopInHour(LocalTime.now());

        newReceipt.setCarPlate(receipt.getCarPlate());
        String carPlate = receipt.getCarPlate();
        CarModel car_dummy1 = restTemplate.getForObject("http://vehicle-service/cars/" + carPlate, CarModel.class);
        Car_brandEntity car_brand_dummy1 = car_brandService.getCarBrandById(car_dummy1.getCarBrandId());
        if (car_brand_dummy1.getBondAvailable() > 0) {
            newReceipt.setBrandBond(car_brand_dummy1.getAmount());
            car_brand_dummy1.setBondAvailable(car_brand_dummy1.getBondAvailable() - 1);
            car_brandService.updateCarBrand(car_brand_dummy1);
        }else{
            newReceipt.setBrandBond(0);
        }
        DayOfWeek day_in_workshop = newReceipt.getWorkshopInDate().getDayOfWeek();
        LocalTime hour_in_workshop = newReceipt.getWorkshopInHour();
        LocalTime start = LocalTime.of(9, 0); // 9:00
        LocalTime end = LocalTime.of(12, 0); //12:00
        if((day_in_workshop.equals(DayOfWeek.MONDAY) || day_in_workshop.equals(DayOfWeek.THURSDAY)) && (hour_in_workshop.isAfter(start) && hour_in_workshop.isBefore(end))){
            newReceipt.setDayOfAttentionDisc(0.1f);
        }else{
            newReceipt.setDayOfAttentionDisc(0);
        }
        int number_repairs_in_12_months = receiptRepository.countReceiptEntitiesByNumberOfRepairsIn12Months(receipt.getCarPlate());
        int typeOfMotor = car_dummy1.getMotor();
        if(number_repairs_in_12_months>=1 && number_repairs_in_12_months <= 2){
            newReceipt.setNumberOfRepairsDisc(matrixRepairs[0][typeOfMotor]);
        } else if (number_repairs_in_12_months>=3 && number_repairs_in_12_months <=5) {
            newReceipt.setNumberOfRepairsDisc(matrixRepairs[1][typeOfMotor]);
        } else if (number_repairs_in_12_months>=6 && number_repairs_in_12_months <= 9) {
            newReceipt.setNumberOfRepairsDisc(matrixRepairs[2][typeOfMotor]);
        } else if (number_repairs_in_12_months >= 10){
            newReceipt.setNumberOfRepairsDisc(matrixRepairs[3][typeOfMotor]);
        } else {
            newReceipt.setNumberOfRepairsDisc(0);
        }
        int hoy = LocalDate.now().getYear();

        int yearsOld = hoy - car_dummy1.getYearOfFabrication();
        int typeOfVehicle = car_dummy1.getType();
        if(yearsOld>=6 && yearsOld <= 10){
            newReceipt.setAgeVehicleSurcharge(matrixVehicleOldness[0][typeOfVehicle]);
        } else if (yearsOld>=11 && yearsOld <= 15) {
            newReceipt.setAgeVehicleSurcharge(matrixVehicleOldness[1][typeOfVehicle]);
        } else if (yearsOld >= 16) {
            newReceipt.setAgeVehicleSurcharge(matrixVehicleOldness[2][typeOfVehicle]);
        } else {
            newReceipt.setAgeVehicleSurcharge(0);
        }
        int kilometersOfVehicle = car_dummy1.getKilometers();
        if(kilometersOfVehicle >= 5001 && kilometersOfVehicle <= 12000){
            newReceipt.setKilometersSurcharge(matrixKilometers[0][typeOfVehicle]);
        } else if (kilometersOfVehicle >= 12001 && kilometersOfVehicle <= 25000) {
            newReceipt.setKilometersSurcharge(matrixKilometers[1][typeOfVehicle]);
        } else if (kilometersOfVehicle >= 25001 && kilometersOfVehicle <= 40000) {
            newReceipt.setKilometersSurcharge(matrixKilometers[2][typeOfVehicle]);
        } else if (kilometersOfVehicle >= 40001) {
            newReceipt.setKilometersSurcharge(matrixKilometers[3][typeOfVehicle]);
        } else {
            newReceipt.setKilometersSurcharge(0);
        }

        ReceiptEntity dummy = receiptRepository.save(newReceipt);
        for(Integer Id: repairIds) {
            Long repairId = Id.longValue();
            RepairsModel repair = restTemplate.getForObject("http://repair-service/repairs/" + repairId, RepairsModel.class);
            ReceiptRepairsEntity dummy2 = new ReceiptRepairsEntity();
            dummy2.setReceiptId(dummy.getId());
            dummy2.setRepairId((repair.getId()));
            dummy2.setPlate(receipt.getCarPlate());
            dummy2.setRepairDate(dummy.getWorkshopInDate());
            dummy2.setRepairTime(dummy.getWorkshopInHour());
            dummy2.setCostOfTheRepair(repair.getCostOfRepair());
            dummy2.setNameOfTheRepair(repair.getRepairName());
            receiptRepairsService.saveReceiptRepairs(dummy2);
            LocalDate today = LocalDate.now();
            int year = today.getYear();
            Month month = today.getMonth();
            int monthOfYear = month.getValue();

            Integer check = restTemplate.getForObject("http://report-service/reports/RepTypeVehType/Month/" + monthOfYear + "/Year/" + year + "/RepairName/" + repair.getRepairName(), Integer.class);
            if(check == 0){
                restTemplate.postForObject("http://report-service/reports/RepTypeVehType/Month/" + monthOfYear + "/Year/" + year + "/RepairName/" + repair.getRepairName(), null, Boolean.class);
                restTemplate.put("http://report-service/reports/RepTypeVehType/" + monthOfYear + "/Year/" + year + "/RepairName/" + repair.getRepairName() + "/Type/" + car_dummy1.getType() + "/Cost/" + repair.getCostOfRepair(), null);
            } else if(check == 1){
                restTemplate.put("http://report-service/reports/RepTypeVehType/" + monthOfYear + "/Year/" + year + "/RepairName/" + repair.getRepairName() + "/Type/" + car_dummy1.getType() + "/Cost/" + repair.getCostOfRepair(), null);
            }
        }

        List<ReceiptRepairsEntity> repairs = receiptRepairsService.getByReceiptId(dummy.getId());
        int repairsSum = 0;
        for (ReceiptRepairsEntity receiptRepairsDummy : repairs) {
            RepairsModel repair = restTemplate.getForObject("http://repair-service/repairs/" + receiptRepairsDummy.getRepairId(), RepairsModel.class);
            repairsSum = repairsSum + repair.getCostOfRepair();
        }
        dummy.setCostOfRepair(repairsSum);

        return updateReceipt(dummy);
    }

    public ReceiptEntity modifyOutDatesReceipt(Long receiptId, LocalDate workshopOutDate, LocalTime workshopOutHour){
        ReceiptEntity moddedReceipt = getReceiptById(receiptId);
        moddedReceipt.setWorkshopOutDate(workshopOutDate);
        moddedReceipt.setWorkshopOutHour(workshopOutHour);
        return updateReceipt(moddedReceipt);
    }

    public ReceiptEntity modifyPickUpDatesReceipt(Long receiptId, LocalDate pickUpDate, LocalTime pickUpHour){
        ReceiptEntity moddedReceipt = getReceiptById(receiptId);
        moddedReceipt.setPickUpDate(pickUpDate);
        moddedReceipt.setPickUpHour(pickUpHour);
        return updateReceipt(moddedReceipt);
    }

    public boolean deleteReceipt(Long id) throws Exception{
        try{
            receiptRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
