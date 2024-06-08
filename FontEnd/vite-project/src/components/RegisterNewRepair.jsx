import {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import repairService from "../services/repair.service.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";

const RegisterNewRepair = () => {
    const [id, setId] = useState("");
    const [repairName, setRepairName] = useState("");
    const [typeOfMotor, setTypeOfMotor] = useState("");
    const [costOfRepair, setCostOfRepair] = useState("");
    const {repairURL} = useParams();
    const navigate = useNavigate();
    const [titleRepairForm, setRepairForm] = useState("");

    const saveRepair = (r) => {
        r.preventDefault();

        const repair = { id, repairName, typeOfMotor, costOfRepair};
        if(repairURL){
            repairService
                .update(repair)
                .then((response) =>{
                    console.log("Repair has been updated", response.data);
                    navigate("/repairs/list");
                })
                .catch((error) => {
                    console.log(
                        "An Error has occurred in the moddified of the repair",
                        error
                    );
                });
        } else {
            repairService
                .create(repair)
                .then((response) => {
                    console.log(
                        "The repair has successfully been registered", response.data);
                    navigate("/repairs/list");
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred trying to register the new repair.",
                        error
                    );
                });
        }
    };

    useEffect(() => {
        if(repairURL){
            setRepairForm("Edit Repair");
            repairService
                .get(repairURL)
                .then((repair) => {
                    setId(repair.data.id);
                    setRepairName(repair.data.repairName);
                    setTypeOfMotor(repair.data.typeOfMotor);
                    setCostOfRepair(repair.data.costOfRepair);
                })
                .catch((error) => {
                    console.log("An error has occurred:", error);
                });
        } else {
            setRepairForm("New Repair Type");
        }
    }, []);
    return(
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
        >
            <h3>{titleRepairForm}</h3>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <FormControl style={{width: '70%'}}>
                    <TextField
                        id="repairName"
                        label="RepairName"
                        value={repairName}
                        variant="standard"
                        onChange={(r) => setRepairName(r.target.value)}
                    />
                </FormControl>
                <br/>
                <FormControl style={{width: '70%'}}>
                    <TextField
                        id="typeOfMotor"
                        label="TypeOfMotor"
                        value={typeOfMotor}
                        variant="standard"
                        onChange={(r) => setTypeOfMotor(r.target.value)}
                    />
                </FormControl>
                <br/>
                <FormControl style={{width: '70%'}}>
                    <TextField
                        id="costOfRepair"
                        label="CostOfRepair"
                        value={costOfRepair}
                        variant="standard"
                        onChange={(r) => setCostOfRepair(r.target.value)}
                    />
                </FormControl>
                <br/>
                <FormControl>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={(c) => saveRepair(c)}
                        style={{marginTop: '1rem'}}
                        startIcon={<SaveIcon/>}
                    >
                        Save
                    </Button>
                </FormControl>

            </form>
            <hr/>
            <Link to="/repairs/list">Return to the list</Link>
        </Box>

    );
};

export default RegisterNewRepair;