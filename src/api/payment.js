import axios from 'axios'
import status from 'javascript-http-status'

const baseUrl = 'https://dapapi.herokuapp.com/api/payments';

function create(amount, datetime, treatmentId) {
    return axios.post(baseUrl, {
        amount: amount,
        datetime: datetime,
        treatment_id: treatmentId
    })
    .then(response => response.status === status.http200Ok)
    .catch(ex => false);
}

function getForTreatment(treatmentId) {
    return axios.get(baseUrl, {
        params: {
            treatment_id: treatmentId
        }
    }).then(result => result.data)
}

const paymentApi = {
    create: create,
    getForTreatment: getForTreatment
}

export { paymentApi }