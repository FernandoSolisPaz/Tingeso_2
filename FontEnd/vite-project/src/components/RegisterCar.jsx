import {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import carService from "../services/car.service.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const RegisterCar = () => {
    const [plate, setPlate] = useState("");
    const [carBrandId, setCarBrandId] = useState("");
    const [model, setModel] = useState("");
    const [type, setType] = useState("");
    const [yearOfFabrication, setYearOfFabrication] = useState("");
    const [motor, setMotor] = useState("");
    const [numberOfSeats, setNumberOfSeats] = useState("");
    const [kilometers, setKilometers] = useState("");
    const {plateURL} = useParams();
    const navigate = useNavigate();
    const [titleCarForm, setCarForm] = useState("");

    const saveCar = (c) => {
        c.preventDefault();

        const car = { plate, carBrandId, model, type, yearOfFabrication, motor, numberOfSeats, kilometers};
        if(plateURL){
        carService
            .update(car)
            .then((response) =>{
                console.log("Car has been updated", response.data);
                navigate("/cars/list");
            })
            .catch((error) => {
                console.log(
                    "An Error has occurred in the moddified of the car",
                    error
                );
            });
    } else {
            carService
                .create(car)
                .then((response) => {
                    console.log(
                        "The car has succefully been registered", response.data);
                    navigate("/cars/list");
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred trying to register the new car.",
                        error
                    );
                });
        }
    };

    useEffect(() => {
        if(plateURL){
            setCarForm("Edit Car");
            carService
                .get(plateURL)
                .then((car) => {
                    setPlate(car.data.plate);
                    setCarBrandId(car.data.carBrandId);
                    setModel(car.data.model);
                    setType(car.data.type);
                    setYearOfFabrication(car.data.yearOfFabrication);
                    setMotor(car.data.motor);
                    setNumberOfSeats(car.data.numberOfSeats);
                    setKilometers(car.data.kilometers);
                })
                .catch((error) => {
                    console.log("An error has occurred:", error);
                });
        } else {
            setCarForm("New Car");
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
            <h3>{titleCarForm}</h3>
            <hr />
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="plate"
                            label="Car Plate"
                            value={plate}
                            variant="standard"
                            onChange={(c) => setPlate(c.target.value)}
                            helperText="Ej. CGZA96"
                        />
                    </FormControl>

                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="carBrandId"
                            label="CarBrandId"
                            value={carBrandId}
                            variant="standard"
                            onChange={(c) => setCarBrandId(c.target.value)}
                        />
                    </FormControl>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="model"
                            label="Model"
                            value={model}
                            variant="standard"
                            onChange={(c) => setModel(c.target.value)}
                        />
                    </FormControl>

                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="type"
                            label="Type"
                            value={type}
                            select
                            variant="standard"
                            onChange={(c) => setType(c.target.value)}
                        >
                            <MenuItem value={"0"}>Sedan</MenuItem>
                            <MenuItem value={"1"}>Hatchback</MenuItem>
                            <MenuItem value={"2"}>SUV</MenuItem>
                            <MenuItem value={"3"}>Pickup</MenuItem>
                            <MenuItem value={"4"}>Furgoneta</MenuItem>
                        </TextField>
                    </FormControl>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="numberOfSeats"
                            label="NumberOfSeats"
                            type="number"
                            value={numberOfSeats}
                            variant="standard"
                            onChange={(c) => setNumberOfSeats(c.target.value)}
                            helperText="Number of seats of your vehicle"
                        />
                    </FormControl>

                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="kilometers"
                            label="Kilometers"
                            type="number"
                            value={kilometers}
                            variant="standard"
                            onChange={(c) => setKilometers(c.target.value)}
                            helperText="Kilometers traveled in your vehicle"
                        />
                    </FormControl>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="motor"
                            label="Motor"
                            value={motor}
                            select
                            variant="standard"
                            onChange={(c) => setMotor(c.target.value)}
                        >
                            <MenuItem value={"0"}>Gasoline</MenuItem>
                            <MenuItem value={"1"}>Diesel</MenuItem>
                            <MenuItem value={"2"}>Hybrid</MenuItem>
                            <MenuItem value={"3"}>Electric</MenuItem>
                        </TextField>
                    </FormControl>
                    <FormControl style={{ width: '49%' }}>
                        <TextField
                            id="yearOfFabrication"
                            label="Year of Fabrication"
                            type="number"
                            value={yearOfFabrication}
                            variant="standard"
                            onChange={(c) => setYearOfFabrication(c.target.value)}
                            helperText="Ej. 2002"
                        />
                    </FormControl>
                    </div>


                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <FormControl>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={(c) => saveCar(c)}
                            style={{ marginTop: '1rem' }}
                            startIcon={<SaveIcon/>}
                        >
                            Save
                        </Button>
                    </FormControl>
                </div>
            </form>
            <hr />
            <Link to="/cars/list">Return to the list</Link>
        </Box>

    );
};

export default RegisterCar;
