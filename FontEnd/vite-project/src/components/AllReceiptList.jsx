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
import carService from "../services/car.service.js";

const AllReceiptList = () => {
    const [receipts, setReceipts] = useState([]);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    const init = async () => {
        receiptService
            .getAll()
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
        await carService.getAll()
            .then((response) => {
                console.log("Showing list of cars.", response.data);
                setCars(response.data);
        })
            .catch((error) =>{
                console.log(
                    "An error has occurred trying to display the list of Cars"
                )
            })
    };

    const handleLocateCar = (plate) => {
        return cars.find((res) => res.plate === plate)
    }

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
                            Car Brand
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Car Model
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Car Type
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Year of Fabrication
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Motor Type
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Date of ingress to workshop
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Hour of ingress to workshop
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Total Amount of the Repairs
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Surcharges Amount
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Discounts Amount
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Sub Total
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold"}}>
                            IVA Amount
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Final Total Cost
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Date out of the workshop
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Hour out of the workshop
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Customer Withdraw Date
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Customer Withdraw Hour
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
                            <TableCell align="left">{handleLocateCar(receipt.carPlate).carBrandId}</TableCell>
                            <TableCell align="left">{handleLocateCar(receipt.carPlate).model}</TableCell>
                            <TableCell align="left">{handleLocateCar(receipt.carPlate).type}</TableCell>
                            <TableCell align="left">{handleLocateCar(receipt.carPlate).yearOfFabrication}</TableCell>
                            <TableCell align="left">{handleLocateCar(receipt.carPlate).motor}</TableCell>
                            <TableCell align="left">{receipt.workshopInDate}</TableCell>
                            <TableCell align="left">{receipt.workshopInHour}</TableCell>
                            <TableCell align="left">{receipt.totalAmount}</TableCell>
                            <TableCell align="left">{receipt.costOfRepair}</TableCell>
                            <TableCell align="left">{receipt.surchargeTotalAmount}</TableCell>
                            <TableCell align="left">{receipt.discountTotalAmount}</TableCell>
                            <TableCell align="left">{receipt.costOfRepair + receipt.surchargeTotalAmount - receipt.discountTotalAmount}</TableCell>
                            <TableCell align="left">{receipt.ivaAmount}</TableCell>
                            <TableCell align="left">{receipt.totalAmount}</TableCell>
                            <TableCell align="left">{receipt.workshopOutDate}</TableCell>
                            <TableCell align="left">{receipt.workshopOutHour}</TableCell>
                            <TableCell align="left">{receipt.pickUpDate}</TableCell>
                            <TableCell align="left">{receipt.pickUpHour}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
};

export default AllReceiptList;