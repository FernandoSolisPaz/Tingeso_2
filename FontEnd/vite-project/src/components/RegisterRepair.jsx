import { useState } from "react";
import Box from "@mui/material/Box";
import receiptService from "../services/receipt.service";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import {FormControlLabel} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const RegisterRepair = () => {
    const [carPlate, setCarPlate] = useState("");
    const [camp2Habilitated, setCamp2] = useState(false);
    const [repairIds, setRepairIds] = useState([]);
    const navigate = useNavigate();
    let tittle = "Register a repair for a car";

    const saveReceipt = (r) =>{
        r.preventDefault();
        const receipt = {carPlate}
        console.log(carPlate);
        receiptService.create(receipt, repairIds)
            .then(response => {
                console.log("Receipt added successfully", response.data);
                navigate("/home");
            })
            .catch((error) => {
                console.log("An error has occurred in the register of the receipt",
                    error
                );
            });
    }



    const handleCarPlateChange = (value) => {
        if (value.trim() !== '') {
            setCamp2(true);
        } else {
            setCamp2(false);
            setRepairIds([]);
        }
    };

    const handleCheckboxChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const isChecked = event.target.checked;

        if (isChecked) {
            setRepairIds([...repairIds, value]);
        } else {
            setRepairIds(repairIds.filter(item => item !== value));
        }
    };

    return(
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
        >
            <h3>{tittle}</h3>
            <hr />
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <FormControl style={{width: '100%'}}>
                    <TextField
                        id="carPlate"
                        label="Car Plate"
                        value={carPlate}
                        variant="standard"
                        onChange={(r) => {
                            setCarPlate(r.target.value);
                            handleCarPlateChange(r.target.value);
                        }}
                        helperText="Ej. CGZA96"
                    />
                </FormControl>
                <FormControl style={{width: '100%'}}>
                    <legend>Options of Repairs:</legend>
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Braking System"
                        value={0}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Refrigeration System"
                        value={1}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Motor"
                        value={2}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Transmision"
                        value={3}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Electric System"
                        value={4}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Escape System"
                        value={5}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Tyres and Wheels"
                        value={6}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Suspension and steering"
                        value={7}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="AC and Heating System"
                        value={8}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Fuel System"
                        value={9}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated}/>}
                        label="Windshield and Glass"
                        value={10}
                    />
                </FormControl>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <FormControl>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={(r) => saveReceipt(r)}
                            style={{marginTop: '1rem'}}
                            startIcon={<SaveIcon/>}
                        >
                            Save
                        </Button>
                    </FormControl>
                </div>
            </form>
        </Box>
    );
};

export default RegisterRepair;