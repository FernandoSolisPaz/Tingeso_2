import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/cars/');
}

const get = carPlate => {
    return httpClient.get(`/cars/${carPlate}`)
}

const create = data => {
    return httpClient.post('/cars/', data);
}

const update = data => {
    return httpClient.put('/cars/', data);
}

const remove = carPlate => {
    return httpClient.delete(`/cars/${carPlate}`);
}

export default  {getAll, get, create, update, remove};