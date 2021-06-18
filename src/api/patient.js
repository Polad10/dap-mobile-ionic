import axios from 'axios';
import status from 'javascript-http-status';

const baseUrl = 'https://dapapi.herokuapp.com/api/patients';

function create(firstName, lastName, city, dob, phoneNr, extraInfo) {
    return axios.post(baseUrl, {
        first_name: firstName,
        last_name: lastName,
        city: city,
        dob: dob,
        phone_nr: phoneNr,
        extra_info: extraInfo
    })
    .then(response => response.status === status.http200Ok)
    .catch(ex => false);
}

function getAll() {
    return axios.get(baseUrl).then(result => result.data);
}

const patientApi = {
    create: create,
    getAll: getAll
}

export { patientApi }