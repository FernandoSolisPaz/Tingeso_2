import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/repairs/');
}

const get = id => {
    return httpClient.get(`/repairs/${id}`)
}

const getByMotor = id => {
    return httpClient.get(`/repairs/Motor/${id}`)
}

const create = data => {
    return httpClient.post('/repairs/', data);
}

const update = data => {
    return httpClient.put('/repairs/', data);
}

const remove = id => {
    return httpClient.delete(`/repairs/${id}`);
}

export default  {getAll, get, getByMotor, create, update, remove};