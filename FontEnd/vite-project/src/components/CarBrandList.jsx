import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import brandService from "../services/brand.service.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const CarBrandList = () => {
    const [carBrands, setCarBrands] = useState([]);

    const navigate = useNavigate();


    const init = () => {
        brandService
            .getAll()
            .then((response) => {
                console.log("Showing list of all cars.", response.data);
                setCarBrands(response.data);
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

    const handleEdit = (id) => {
        console.log("Printing id", id);
        navigate(`/car_brand/edit/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <br />
            Car Brand List
            <br /> <br />
            <Table sx={{ minWidth: 650}} size="small" aria-label= "a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Brand Id
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Brand Name
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Number of Bonds Available
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Amount of the Bond
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carBrands.map((carBrand) => (
                        <TableRow
                            key={carBrand.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0} }}
                        >
                            <TableCell align="left">{carBrand.id}</TableCell>
                            <TableCell align="left">{carBrand.brandName}</TableCell>
                            <TableCell align="left">{carBrand.bondAvailable}</TableCell>
                            <TableCell align="left">{carBrand.amount}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleEdit(carBrand.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CarBrandList;