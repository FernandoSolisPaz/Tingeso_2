import { useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import receiptService from "../services/receipt.service.js";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const ReceiptShow = () => {
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
    const [pickUpDate, setDatePickUp] = useState("");
    const [pickUpHour, setPickUpHour] = useState("");
    const [workshopOutDate, setDateWorkshopOut] = useState("");
    const [workshopOutHour, setTimeWorkshopOut] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    let title = "Receipt Details"

    const returnToList = (carPlate) => {
        navigate(`/receipts/list/${carPlate}`)
    }

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
                    setDatePickUp(receipt.data.pickUpDate);
                    setPickUpHour(receipt.data.pickUpHour);
                    setDateWorkshopOut(receipt.data.workshopOutDate);
                    setTimeWorkshopOut(receipt.data.workshopOutHour);
                })
                .catch((error) => {
                    console.log("An error has occurred", error);
                });
        } else {
            console.log("An error has occurred");
        }
    }, []);

    return (

        <TableContainer component={Paper} align="center">
            <h3>{title}</h3>
            <TableBody>
                <TableCell>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Receipt Id
                    </TableRow>
                    <Divider/>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Car Plate
                    </TableRow>
                    <TableRow align="left" sx={{ fontWeight: "bold"}}>
                        Base cost of Repairs
                    </TableRow>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Brand Bond received
                    </TableRow>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Day of Attention Discount (%)
                    </TableRow>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Number of Repairs Discount (%)
                    </TableRow>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Age of the Vehicle Surcharge (%)
                    </TableRow>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Kilometers of the Vehicle Surcharge (%)
                    </TableRow>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Delay of Pick Up Surcharge (%)
                    </TableRow>
                    <Divider/>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        Total Amount
                    </TableRow>
                </TableCell>
                <TableCell>
                    <TableRow align="right">
                        {id}
                    </TableRow>
                    <TableRow align="right">
                        {carPlate}
                    </TableRow>
                    <TableRow align="right">
                        {costOfRepair}
                    </TableRow>
                    <TableRow align="right">
                        {brandBond}
                    </TableRow>
                    <TableRow align="right">
                        {dayOfAttentionDisc}
                    </TableRow>
                    <TableRow align="right">
                        {numberOfRepairsDisc}
                    </TableRow>
                    <TableRow align="right">
                        {ageVehicleSurcharge}
                    </TableRow>
                    <TableRow align="right">
                        {kilometersSurcharge}
                    </TableRow>
                    <TableRow align="right">
                        {delayOfPickUpSurcharge}
                    </TableRow>
                    <TableRow align="right">
                        {totalAmount}
                    </TableRow>
                </TableCell>
            </TableBody>
            <Button
                variant="contained"
                color="info"
                onClick={() => returnToList(carPlate)}
                style={{ marginTop: "1rem" }}
                startIcon={<KeyboardReturnIcon />}
            >
                Return to List
            </Button>
        </TableContainer>


    )
}


export default ReceiptShow;
