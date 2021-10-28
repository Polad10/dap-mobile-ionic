import axios from 'axios'

const baseUrl = 'https://dapapi.herokuapp.com/api/products'

function getForTreatment(treatmentId) {
    return axios.get(baseUrl, {
        params: {
            treatment_id: treatmentId
        }
    }).then(result => result.data)
}

const productApi = {
    getForTreatment: getForTreatment
}

export { productApi }