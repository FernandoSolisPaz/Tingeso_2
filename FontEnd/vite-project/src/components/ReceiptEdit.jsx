import {useEffect, useState} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {useParams, useNavigate, Link} from "react-router-dom";
import receiptService from "../services/receipt.service.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import moment from "moment";

const UpdateReceipt = () => {
    const [outDatemod, setOutDatemod] = useState(false);
    const [outTimemod, setOutTimemod] = useState(false);
    const [pickDatemod, setPickDatemod] = useState(false);
    const [pickTimemod, setPickTimemod] = useState(false);
    const [costOfRepair, setCostOfRepair] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [workshopInDate, setWorkshopInDate] = useState("");
    const [workshopInHour, setWorkshopInHour] = useState("");
    const [carPlate, setCarPlate] = useState("");
    const [brandBond, setBrandBond] = useState("");
    const [dayOfAttentionDisc,setDayOfAttentionDisc] = useState("");
    const [numberOfRepairsDisc, setNumberOfRepairsDisc] = useState("");
    const [ageVehicleSurcharge, setAgeVehicleSurcharge] = useState("");
    const [delayOfPickUpSurcharge, setDelayOfPickUpSurcharge] = useState("");
    const [kilometersSurcharge, setKilometersSurcharge] = useState("");
    const {id} = useParams();

    const [pickUpDate, setDatePickUp] = useState(null);
    const [pickUpHour, setPickUpHour] = useState(null);
    const [workshopOutDate, setDateWorkshopOut] = useState(null);
    const [workshopOutHour, setTimeWorkshopOut] = useState(null);

    const [pickUpDateHolder, setDatePickUpHolder] = useState("");
    const [pickUpHourHolder, setTimePickUpHolder] = useState("");
    const [workshopOutDateHolder, setDateWorkshopOutHolder] = useState("");
    const [workshopOutHourHolder, setTimeWorkshopOutHolder] = useState("");

    const navigate = useNavigate();
    let title = "Edit Dates and Times of a Receipt"

    const formatTime = (time) => {
        return moment(time).format('HH:mm:ss');
    }

    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }

    const updateReceipt = (r) => {
        r.preventDefault();
        const receipt = {costOfRepair, totalAmount, workshopInDate, workshopInHour, carPlate, brandBond, dayOfAttentionDisc, numberOfRepairsDisc, ageVehicleSurcharge, delayOfPickUpSurcharge, kilometersSurcharge, pickUpDateHolder, pickUpHourHolder, workshopOutDateHolder, workshopOutHourHolder, id};
        if(outDatemod && outTimemod){
            setOutDatemod(false);
            setOutTimemod(false);
            receiptService
                .updateOutDate(receipt.id ,receipt.workshopOutDateHolder, receipt.workshopOutHourHolder)
                .then((response) => {
                    console.log("workshopOut Info updated", response.data);
            })
            .catch((error) => {
                console.log(
                    "An error has occurred in the process of modifying the workshopOut Date", error
                );
            });
        }
        if(pickDatemod && pickTimemod){
            setPickDatemod(false);
            setPickTimemod(false);
            receiptService
                .updatePickUpDate(receipt.id, receipt.pickUpDateHolder, receipt.pickUpHourHolder)
                .then((response) => {
                    console.log("Pick Up Date info updated", response.data);
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred in the process of modifying the PickUp Date", error
                    );
                });
        }
        navigate(`/receipts/list/${receipt.carPlate}`);
    };

    useEffect(() => {
        if(id){
            receiptService
                .get(id)
                .then((receipt) => {
                    setCarPlate(receipt.data.carPlate);
                    setCostOfRepair(receipt.data.costOfRepair);
                    setTotalAmount(receipt.data.totalAmount);
                    setWorkshopInDate(receipt.data.workshopInDate);
                    setWorkshopInHour(receipt.data.workshopInHour);
                    setBrandBond(receipt.data.brandBond);
                    setDayOfAttentionDisc(receipt.data.dayOfAttentionDisc);
                    setNumberOfRepairsDisc(receipt.data.numberOfRepairsDisc);
                    setAgeVehicleSurcharge(receipt.data.ageVehicleSurcharge);
                    setDelayOfPickUpSurcharge(receipt.data.delayOfPickUpSurcharge);
                    setKilometersSurcharge(receipt.data.kilometersSurcharge);
                    setDatePickUpHolder(receipt.data.pickUpDate);
                    setTimePickUpHolder(receipt.data.pickUpHour);
                    setDateWorkshopOutHolder(receipt.data.workshopOutDate);
                    setTimeWorkshopOutHolder(receipt.data.workshopOutHour);
                })
                .catch((error) => {
                    console.log("An error has occurred", error);
                });
        } else {
            console.log("An error has occurred");
        }
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
        >
            <h3>{title}</h3>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                    <p>Previous Date: {workshopOutDateHolder}</p>
                    <p>Previous Hour: {workshopOutHourHolder}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <FormControl style={{width: '49%'}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker label="New Workshop Out Date" selected={workshopOutDate} onChange={(workshopOutDate) => {
                                setOutDatemod(true);
                                setDateWorkshopOutHolder(formatDate(workshopOutDate));
                            }} />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl style={{width:'49%'}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker label="New Workshop Out Hour" ampm={false} value={workshopOutHour} onChange={(newTime) => {
                                setOutTimemod(true);
                                setTimeWorkshopOutHolder(formatTime(newTime));
                            }}/>
                        </LocalizationProvider>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                    <p>Previous Date: {pickUpDateHolder}</p>
                    <p>Previous Hour: {pickUpHourHolder}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <FormControl style={{width: '49%'}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker label="New PickUp date" selected={pickUpDate} onChange={(pickUpDate) => {
                                setPickDatemod(true);
                                setDatePickUpHolder(formatDate(pickUpDate));
                            }} />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl style={{width: '49%'}}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TimePicker label="New PickUp Hour" ampm={false} value={pickUpHour} onChange={(newTimePickUp) => {
                                setPickTimemod(true);
                                setTimePickUpHolder(formatTime(newTimePickUp));
                            }}/>
                        </LocalizationProvider>
                    </FormControl>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <FormControl>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={(r) => updateReceipt(r)}
                            style={{marginTop: '1rem'}}
                            startIcon={<SaveIcon/>}
                        >
                            Save
                        </Button>
                    </FormControl>
                </div>
            </form>
            <hr/>
            <Link to="/cars/list">Return to Car list</Link>
        </Box>
        
    );
};

export default UpdateReceipt;