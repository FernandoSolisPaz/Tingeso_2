import { useEffect, useState} from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import reportService from '../services/report.service.js'
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const ReportTypeRepair = () => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [reportRow, setReportRow] = useState([]);

    const init = async () => {
        const report = await reportService.getTypeRepairReport(month, year)
        setReportRow(report.data)

    };

    useEffect(() => {
        if(month !== "" && year !== ""){
            init();
        }
    }, [month, year]);
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
        >
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <FormControl style={{width: '75%'}}>
                    <TextField
                        id="month"
                        label="Month"
                        value={month}
                        select
                        variant="standard"
                        onChange={(month) => {
                            setMonth(month.target.value)
                        }}
                    >
                        <MenuItem value={"1"}>January</MenuItem>
                        <MenuItem value={"2"}>February</MenuItem>
                        <MenuItem value={"3"}>March</MenuItem>
                        <MenuItem value={"4"}>April</MenuItem>
                        <MenuItem value={"5"}>May</MenuItem>
                        <MenuItem value={"6"}>June</MenuItem>
                        <MenuItem value={"7"}>July</MenuItem>
                        <MenuItem value={"8"}>August</MenuItem>
                        <MenuItem value={"9"}>September</MenuItem>
                        <MenuItem value={"10"}>October</MenuItem>
                        <MenuItem value={"11"}>November</MenuItem>
                        <MenuItem value={"12"}>December</MenuItem>
                    </TextField>
                </FormControl>
                <FormControl style={{ width: '75%' }}>
                    <TextField
                        id="year"
                        label="Year"
                        value={year}
                        variant="standard"
                        onChange={(year) => {
                            setYear(year.target.value)
                        }}
                        helperText="Ej. 2024"
                    />
                </FormControl>
            </form>

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                                        List of Repairs
                                    </TableCell>
                                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                                        Sedán
                                    </TableCell>
                                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                                        Hatchback
                                    </TableCell>
                                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                                        SUV
                                    </TableCell>
                                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                                        Pickup
                                    </TableCell>
                                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                                        Furgoneta
                                    </TableCell>
                                    <TableCell align="left" sx={{fontWeight: "bold"}}>
                                        TOTAL
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportRow.map((rep) => (
                                    <React.Fragment key={rep.id}>
                                        <TableRow
                                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                        >
                                            <TableCell align="left">{rep.repairName}</TableCell>
                                            <TableCell align="left">{rep.sedanCount}</TableCell>
                                            <TableCell align="left">{rep.hatchbackCount}</TableCell>
                                            <TableCell align="left">{rep.suvCount}</TableCell>
                                            <TableCell align="left">{rep.pickupCount}</TableCell>
                                            <TableCell align="left">{rep.furgonetaCount}</TableCell>
                                            <TableCell align="left">{rep.totalCount}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                        >
                                            <TableCell align="left">-</TableCell>
                                            <TableCell align="left">{rep.sedanTotalAmount}</TableCell>
                                            <TableCell align="left">{rep.hatchbackTotalAmount}</TableCell>
                                            <TableCell align="left">{rep.suvTotalAmount}</TableCell>
                                            <TableCell align="left">{rep.pickupTotalAmount}</TableCell>
                                            <TableCell align="left">{rep.furgonetaTotalAmount}</TableCell>
                                            <TableCell align="left">{rep.totalAmount}</TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                        <br/>
                        <Link to="/report/list"
                              style={{textDecoration: "none", marginLeft: "1rem"}}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<KeyboardReturnIcon/>}
                            >
                                Return to List
                            </Button>
                        </Link>
                    </TableContainer>
        </Box>
);
};

export default ReportTypeRepair;