import httpClient from '../http-common';

const getTypeRepairReport = (month, year) => {
    return httpClient.get(`/reports/RepTypeVehType/Month/${month}/Year/${year}`);
}


export default { getTypeRepairReport}