import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/administrate/receipt/');
}

const get = id => {
    return httpClient.get(`/administrate/receipt/${id}`)
}

const getByCarPlate = plate => {
    return httpClient.get(`/administrate/receipt/byPlate/${plate}`);
}

const create = (data, repairIds ) => {
    const repairIdsString = repairIds.join(',');

    const url = `/administrate/receipt/?repairIds=${repairIdsString}`;
    return httpClient.post(url, data);
}

const update = data => {
    return httpClient.put('/administrate/receipt/', data);
}

const updateOutDate = (id, workshopOutDate, workshopOutHour) => {
    return httpClient.put(`/administrate/receipt/modify_out_date/${id}?workshopOutDate=${workshopOutDate}&workshopOutHour=${workshopOutHour}`);
}

const updatePickUpDate = (id, pickUpDate, pickUpHour) => {
    return httpClient.put(`/administrate/receipt/modify_pickUp_date/${id}?pickUpDate=${pickUpDate}&pickUpHour=${pickUpHour}`);
}

const remove = id => {
    return httpClient.delete(`/administrate/receipt/${id}`);
}

export default  {getAll, get, getByCarPlate, create, update, updateOutDate, updatePickUpDate, remove};