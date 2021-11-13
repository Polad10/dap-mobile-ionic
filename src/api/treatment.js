import axios from 'axios';
import status from 'javascript-http-status';

const baseUrl = 'https://dapapi.herokuapp.com/api/treatments';

function create(startDate, diagnosis, extraInfo, patientId, products) {
    return axios.post(baseUrl, {
        start_date: startDate,
        diagnosis: diagnosis,
        extra_info: extraInfo,
        patient_id: patientId,
        products: products
    })
    .then(response => response.status === status.http200Ok)
    .catch(ex => false);
}

function getAll() {
    return axios.get(baseUrl).then(result => result.data);
}

function getForPatient(patientId) {
    return axios.get(baseUrl, {
        params: {
            patient_id: patientId
        }
    }).then(result => result.data);
}

const treatmentApi = {
    getAll: getAll,
    getForPatient: getForPatient,
    create: create
}

export { treatmentApi }