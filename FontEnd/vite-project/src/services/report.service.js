import httpClient from '../http-common';

const getTypeRepairReport = (month, year) => {
    return httpClient.get(`/reports/RepTypeVehType/Month/${month}/Year/${year}`);
}

const getRepairMonthReport = (month, year) => {
    return httpClient.get(`/reports/RepTypeVar/Generate/Month/${month}/Year/${year}`);
}


export default { getTypeRepairReport, getRepairMonthReport}