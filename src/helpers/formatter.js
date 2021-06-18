import { DateTime } from 'luxon'

function splitDateTime(arr) {
    arr.forEach(a => {    
        const datetime = DateTime.fromISO(a.datetime);

        a.date = datetime.toISODate();
        a.time = datetime.toLocaleString(DateTime.TIME_24_SIMPLE);
    });
}

const formatter = {
    splitDateTime: splitDateTime
}

export { formatter }