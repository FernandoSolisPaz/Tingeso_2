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

const ReportRepairMonth = () => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [reportRow, setReportRow] = useState([]);
    const [actualMonth, setActualMonth] = useState("");
    const [prevMonth, setPrevMonth] = useState("");
    const [prevMonth2, setPrevMonth2] = useState("");

    const replaceNumberToMonth = (monthS) => {
        switch (monthS) {
            case 1:
                return "January"
            case 2:
                return "February"
            case 3:
                return "March"
            case 4:
                return "April"
            case 5:
                return "May"
            case 6:
                return "June"
            case 7:
                return "July"
            case 8:
                return "August"
            case 9:
                return "September"
            case 10:
                return "October"
            case 11:
                return "November"
            case 12:
                return "December"
            default:
                return "BAD NUMBER"
        }
    }

    const handleInfCase = (variation) => {
        switch (variation) {
            case -0.00001:
                return "-Inf"
            case 0.00001:
                return "Inf"
            default:
                return variation
        }
    }

    const init = async () => {
        await handleMonths(month)
        const report = await reportService.getRepairMonthReport(month, year)
        setReportRow(report.data)

    };

    const handleMonths = (monthSelected) => {
        switch (monthSelected){
            case 1:
                setActualMonth(replaceNumberToMonth(monthSelected))
                setPrevMonth(replaceNumberToMonth(12))
                setPrevMonth2(replaceNumberToMonth(11))
                return
            case 2:
                setActualMonth(replaceNumberToMonth(monthSelected))
                setPrevMonth(replaceNumberToMonth(1))
                setPrevMonth2(replaceNumberToMonth(12))
                return
            default:
                setActualMonth(replaceNumberToMonth(monthSelected))
                setPrevMonth(replaceNumberToMonth(monthSelected - 1))
                setPrevMonth2(replaceNumberToMonth(monthSelected -2))
                return
        }
    }

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
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </TextField>
                </FormControl>
                <FormControl style={{width: '75%'}}>
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
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Months
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                {actualMonth}
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Variation %
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                {prevMonth}
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                Variation %
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                {prevMonth2}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportRow.map((rep) => (
                            <React.Fragment key={rep.id}>
                                        <TableRow
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell align="left">{rep.repairName}</TableCell>
                                            <TableCell align="left">{rep.actualMonthCount}</TableCell>
                                            <TableCell align="left">{handleInfCase(rep.variationActualVsPrevMonthCount)}</TableCell>
                                            <TableCell align="left">{rep.prevMonthCount}</TableCell>
                                            <TableCell align="left">{handleInfCase(rep.variationPrevMonthVsPrev2MonthCount)}</TableCell>
                                            <TableCell align="left">{rep.prev2MonthCount}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell align="left">-</TableCell>
                                            <TableCell align="left">{rep.actualMonthAmount}</TableCell>
                                            <TableCell align="left">{handleInfCase(rep.variationActualVsPrevMonthAmount)}</TableCell>
                                            <TableCell align="left">{rep.prevMonthAmount}</TableCell>
                                            <TableCell align="left">{handleInfCase(rep.variationPrevMonthVsPrev2MonthAmount)}</TableCell>
                                            <TableCell align="left">{rep.prev2MonthAmount}</TableCell>
                                        </TableRow>
                            </React.Fragment>

                        ))}
                            </TableBody>
                    </Table>
                    <br />
                    <Link to="/report/list" style={{ textDecoration: "none", marginLeft: "1rem" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<KeyboardReturnIcon />}
                        >
                            Return to List
                        </Button>
                    </Link>
        </TableContainer>

        </Box>
    );
};

export default ReportRepairMonth;