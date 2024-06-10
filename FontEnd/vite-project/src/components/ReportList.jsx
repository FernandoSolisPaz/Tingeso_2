import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from "react-router-dom";


const ReportList = () => {
    const navigate = useNavigate();
    let title = "Report Section"

    const handleTypeRepairReport = () =>{
        navigate("/reportTypeRepair");
    };

    const handleTypeRepairByMonthReport = () =>{
        navigate("/reportRepairByMonth");
    };

    return (
        <TableContainer component={Paper} align="center">
            <h3>{title}</h3>
            <TableBody>
                <TableCell>
                    <TableRow align="left" sx={{fontWeight: "bold", marginBottom: "1rem"}}>
                        Report by Type of Car and Repair
                    </TableRow>
                    <br/>
                    <TableRow align="left" sx={{fontWeight: "bold", marginBottom: "1rem"}}>
                        Report Type of Repairs by Months
                    </TableRow>
                </TableCell>
                <TableCell>
                    <TableRow align="left" sx={{fontWeight: "bold", marginBottom: "1rem"}}>
                        <Button
                            variant="contained"
                            color="info"
                            size="small"
                            onClick={() => handleTypeRepairReport()}
                            style={{marginLeft: "0.5rem"}}
                            startIcon={<DescriptionIcon/>}
                        >
                            View Report
                        </Button>
                    </TableRow>
                    <br/>
                    <TableRow align="left" sx={{fontWeight: "bold", marginBottom: "1rem"}}>
                        <Button
                            variant="contained"
                            color="info"
                            size="small"
                            onClick={() => handleTypeRepairByMonthReport()}
                            style={{marginLeft: "0.5rem"}}
                            startIcon={<DescriptionIcon/>}
                        >
                            View Report
                        </Button>
                    </TableRow>
                </TableCell>
            </TableBody>
        </TableContainer>
    )

}

export default ReportList;