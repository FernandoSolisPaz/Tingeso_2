import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import carService from "../services/car.service.js";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';

const CarList = () => {
    const [cars, setCars] = useState([]);

    const navigate = useNavigate();


    const init = () => {
        carService
            .getAll()
            .then((response) => {
                console.log("Showing list of all cars.", response.data);
                setCars(response.data);
            })
            .catch((error) => {
                console.log(
                    "An error has occurred trying to display the list of cars.",
                    error
                );
            });
    };
    useEffect(() => {
        init();
    }, []);
    const handleDelete = (plate) => {
        console.log("Printing Plate", plate);
        const confirmDelete = window.confirm(
            "Do you want to delete this car?"
        );
        if(confirmDelete) {
            carService
                .remove(plate)
                .then((response) => {
                    console.log("Car has been removed", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred trying to delete de car",
                        error
                    );
                });

        }
    }
    const replaceIdType = (Id) => {
        switch (Id){
            case 0:
                return 'Sedán'
            case 1:
                return 'Hatchback'
            case 2:
                return 'SUV'
            case 3:
                return 'Pickup'
            case 4:
                return 'Furgoneta'
            default:
                console.log("Error type not found")
        }
    }
    const replaceIdMotor = (Id) => {
        switch (Id){
            case 0:
                return 'Gasoline'
            case 1:
                return 'Diesel'
            case 2:
                return 'Hybrid'
            case 3:
                return 'Electric'
            default:
                console.log('Motor id not found')
        }
    }
    const handleEdit = (plate) => {
        console.log("Printing id", plate);
        navigate(`/cars/edit/${plate}`);
    };

    const handleReceiptShow = (plate) => {
        console.log("Printing Plate", plate);
        navigate(`/receipts/list/${plate}`);
    };

    return (
        <TableContainer component={Paper}>
            <br />
            <Link to="/cars/add"
            style={{ textDecoration: "none", marginBottom: "1rem"}}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DirectionsCarIcon />}
                    >
                    Add Car
                </Button>
            </Link>
            <br /> <br />
            <Table sx={{ minWidth: 650}} size="small" aria-label= "a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Plate
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Car Brand
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Model
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Type
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Year of fabrication
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Motor
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Kilometers
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map((car) => (
                        <TableRow
                        key={car.plate}
                        sx={{ "&:last-child td, &:last-child th": { border: 0} }}
                        >
                            <TableCell align="left">{car.plate}</TableCell>
                            <TableCell align="left">{car.carBrandId}</TableCell>
                            <TableCell align="left">{car.model}</TableCell>
                            <TableCell align="left">{replaceIdType(car.type)}</TableCell>
                            <TableCell align="left">{car.yearOfFabrication}</TableCell>
                            <TableCell align="left">{replaceIdMotor(car.motor)}</TableCell>
                            <TableCell align="left">{car.kilometers}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleReceiptShow(car.plate)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<VisibilityIcon />}
                                >
                                    Show Receipts
                                </Button>

                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleEdit(car.plate)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(car.plate)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CarList;