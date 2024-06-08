import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/administrate/car_brand/');
}
const get = id => {
    return httpClient.get(`/administrate/car_brand/${id}`);
}

const create = data => {
    return httpClient.post('/administrate/car_brand/', data);
}

const update = data => {
    return httpClient.put('/administrate/car_brand/', data);
}

const remove = id => {
    return httpClient.delete(`/administrate/car_brand/${id}`)
}

export default {getAll, get, create, update, remove};