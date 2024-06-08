import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import repairService from "../services/repair.service.js";
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

const RepairList = () => {
    const [repairs, setRepairs] = useState([]);

    const navigate = useNavigate();


    const init = () => {
        repairService
            .getAll ()
            .then((response) => {
                console.log("Showing list of all repairs.", response.data);
                setRepairs(response.data);
            })
            .catch((error) => {
                console.log(
                    "An error has occurred trying to display the list of repairs.",
                    error
                );
            });
    };
    useEffect(() => {
        init();
    }, []);
    const handleDelete = (id) => {
        console.log("Printing Id", id);
        const confirmDelete = window.confirm(
            "Do you want to delete this repair?"
        );
        if(confirmDelete) {
            repairService
                .remove(id)
                .then((response) => {
                    console.log("Repair has been removed", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred trying to delete this repair",
                        error
                    );
                });

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
    const handleEdit = (id) => {
        console.log("Printing id", id);
        navigate(`/repairs/edit/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <br />
            <Link to="/repairs/add"
                  style={{ textDecoration: "none", marginBottom: "1rem"}}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DirectionsCarIcon />}
                >
                    Add New Repair
                </Button>
            </Link>
            <br /> <br />
            <Table sx={{ minWidth: 650}} size="small" aria-label= "a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Repair Name
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Type of Motor
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Cost of the Repair
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repairs.map((repair) => (
                        <TableRow
                            key={repair.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0} }}
                        >
                            <TableCell align="left">{repair.repairName}</TableCell>
                            <TableCell align="left">{replaceIdMotor(repair.typeOfMotor)}</TableCell>
                            <TableCell align="left">{repair.costOfRepair}</TableCell>

                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleEdit(repair.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(repair.id)}
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

export default RepairList;