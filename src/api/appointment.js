import axios from 'axios';
import { DateTime } from 'luxon';
import status from 'javascript-http-status';
import { formatter } from '../helpers/formatter.js';

const baseUrl = 'https://dapapi.herokuapp.com/api/appointments';

function create(datetime, actions, treatmentId) {
    return axios.post(baseUrl, {
        datetime: datetime,
        actions: actions,
        treatment_id: treatmentId
    })
    .then(response => response.status === status.http200Ok)
    .catch(ex => false);
}

function getUpcoming() {
    const minDate = DateTime.now().toISO();

    return axios.get(baseUrl, {
        params: {
            expected: true,
            mindDate: minDate
        }
    }).then((result) => {
        result.data.sort((first, second) => {
            return first.datetime > second.datetime;
        });

        formatter.splitDateTime(result.data);
        
        return result.data;
    });
}

function done(id) {
    return axios.put(`${baseUrl}/${id}?status=donesssss`).then(response => response.status === status.http200Ok)
        .catch(ex => true);
}

function cancel(id) {
    return axios.put(`${baseUrl}/${id}?status=cancelsssss`).then(response => response.status === status.http200Ok)
        .catch(ex => true);
}

const appointmentApi = {
    create: create,
    getUpcoming: getUpcoming,
    done: done,
    cancel: cancel
}

export { appointmentApi }