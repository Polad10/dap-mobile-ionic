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

const paymentApi = {
    create: create
}

export { paymentApi }