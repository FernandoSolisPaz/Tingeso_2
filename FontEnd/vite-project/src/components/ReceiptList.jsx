import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import receiptService from "../services/receipt.service";
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

const ReceiptList = () => {
    const [receipts, setReceipts] = useState([]);
    const carPlate = useParams();
    const navigate = useNavigate();

    const init = () => {
        console.log(carPlate.carPlate);
        receiptService
            .getByCarPlate(carPlate.carPlate)
            .then((response) => {
                console.log("Showing list of receipts.", response.data);
                setReceipts(response.data);
            })
            .catch((error) => {
                console.log(
                    "An error has occurred trying to display the list of receipts.",
                    error
                );
            });
    };
    useEffect(() => {
        init();
    }, []);
    const handleDelete = (id) => {
        console.log("Printing id", id);
        const confirmDelete = window.confirm(
            "Do you want to delete this receipt?"
        );
        if(confirmDelete) {
            receiptService
                .remove(id)
                .then((response) => {
                    console.log("Deleted receipt", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred trying to delete receipt.",
                        error
                    );
                });
        }
    }
    const handleEdit = (id) => {
        console.log("Printing edit receipt", id);
        navigate(`/receipts/edit/${id}`);
    };

    const handleShowDetails = (id) => {
        console.log("Showing details", id);
        navigate(`/receipts/details/${id}`);
    }

    return (
        <TableContainer component={Paper}>
            <br /> <br />
            <Table sx={{ minWidth: 650}} size="small" aria-label= "a dense table">
                <TableHead>
                    <TableRow align="left" sx={{ fontWeight: "bold" }}>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Receipt Id
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Car Plate
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Date of ingress to workshop
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Total Amount
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {receipts.map((receipt) => (
                        <TableRow
                            key={receipt.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0} }}
                           >
                                <TableCell align="left">{receipt.id}</TableCell>
                                <TableCell align="left">{receipt.carPlate}</TableCell>
                                <TableCell align="left">{receipt.workshopInDate}</TableCell>
                                <TableCell align="left">{receipt.totalAmount}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        size="small"
                                        onClick={() => handleShowDetails(receipt.id)}
                                        style={{ marginLeft: "0.5rem" }}
                                        startIcon={<VisibilityIcon />}
                                    >
                                        Show Details
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        size="small"
                                        onClick={() => handleEdit(receipt.id)}
                                        style={{ marginLeft: "0.5rem" }}
                                        startIcon={<EditIcon />}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(receipt.id)}
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

export default ReceiptList;