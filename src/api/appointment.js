import axios from 'axios';
import { DateTime } from 'luxon';
import status from 'javascript-http-status';
import { formatter } from '../helpers/formatter.js';

const baseUrl = 'https://dapapi.herokuapp.com/api/appointments';

function getUpcomingHelper(patientId) {
    const minDate = DateTime.now().toISO();
    const params = {
        expected: true,
        mindDate: minDate
    }

    if(patientId) {
        params.patient_id = patientId
    }

    return axios.get(baseUrl, {
        params: params
    }).then((result) => {
        result.data.sort((first, second) => {
            return first.datetime > second.datetime;
        });

        formatter.splitDateTime(result.data);
        
        return result.data;
    });
}

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
    return getUpcomingHelper()
}

function getUpcomingFor(patientId) {
    return getUpcomingHelper(patientId)
}

function done(id) {
    return axios.put(`${baseUrl}/${id}?status=done`).then(response => response.status === status.http200Ok)
        .catch(ex => false);
}

function cancel(id) {
    return axios.put(`${baseUrl}/${id}?status=cancel`).then(response => response.status === status.http200Ok)
        .catch(ex => false);
}

const appointmentApi = {
    create: create,
    getUpcoming: getUpcoming,
    getUpcomingFor: getUpcomingFor,
    done: done,
    cancel: cancel
}

export { appointmentApi }