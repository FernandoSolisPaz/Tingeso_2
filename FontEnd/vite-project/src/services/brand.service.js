import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/car_brand/');
}
const get = id => {
    return httpClient.get(`/api/car_brand/${id}`);
}

const create = data => {
    return httpClient.post('/api/car_brand/', data);
}

const update = data => {
    return httpClient.put('/api/car_brand/', data);
}

const remove = id => {
    return httpClient.delete(`/api/car_brand/${id}`)
}

export default {getAll, get, create, update, remove};