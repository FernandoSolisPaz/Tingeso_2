import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import receiptService from "../services/receipt.service";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import {FormControlLabel} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import repairService from "../services/repair.service.js";
import carService from "../services/car.service.js";

const RegisterRepair = () => {
    const [carPlate, setCarPlate] = useState("");
    const [camp2Habilitated, setCamp2] = useState(false);
    const [repairIds, setRepairIds] = useState([]);
    const [repairs, setRepairs] = useState([]);
    const [loading, setLoading] = useState(false);
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



    const handleCarPlateChange = async (value) => {
        setCamp2(false);
        setRepairIds([]);
        setRepairs([]);
        setLoading(true);
        if (value.trim() !== '') {
            const car = await carService.get(value)
            const motorType = car.data.motor
            if (motorType !== "") {
                console.log(motorType);
                setCamp2(true);
                repairService.getByMotor(motorType)
                    .then(response => {
                        console.log(response.data);
                        setRepairs(response.data)
                    })
                    .catch((error) => {
                        console.log(
                            "An error has occurred trying to display the list of repairs.",
                            error
                        );
                    });
            } else {
                setCamp2(false);
                setRepairIds([]);
                setRepairs([]);
            }

        } else {
            setCamp2(false);
            setRepairIds([]);
            setRepairs([]);
        }
    }

    const handleCheckboxChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const isChecked = event.target.checked;

        if (isChecked) {
            setRepairIds([...repairIds, value]);
        } else {
            setRepairIds(repairIds.filter(item => item !== value));
        }
    };

    useEffect(() => {
        setLoading(false);
    }, [repairs]);

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
                <FormControl style={{ width: '100%' }}>
                    <legend>Options of Repairs:</legend>
                    {loading ? (
                        <p>Loading repairs...</p>
                    ) : (
                        repairs.map((repair) => (
                            <FormControlLabel
                                key={repair.id}
                                control={<Checkbox onChange={handleCheckboxChange} disabled={!camp2Habilitated} />}
                                label={repair.repairName}
                                value={repair.id}
                            />
                        ))
                    )}
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