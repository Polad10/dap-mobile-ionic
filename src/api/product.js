import axios from 'axios'
import status from 'javascript-http-status';

const baseUrl = 'https://dapapi.herokuapp.com/api/products'

function getForTreatment(treatmentId) {
    return axios.get(baseUrl, {
        params: {
            treatment_id: treatmentId
        }
    }).then(result => result.data)
}

function create(name, quantity, price, treatmentId) {
    return axios.post(baseUrl, {
        name: name,
        quantity: quantity,
        price: price,
        treatment_id: treatmentId
    })
    .then(res => {
        if(res.status === status.http200Ok) {
            return res.data
        }

        return false
    })
    .catch(ex => false)
}

function remove(id) {
    return axios.delete(`${baseUrl}/${id}`)
            .then(res => res.status === status.http204NoContent)
            .catch(ex => false)
}

const productApi = {
    getForTreatment: getForTreatment,
    create: create,
    remove: remove
}

export { productApi }