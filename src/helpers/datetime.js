import { DateTime } from 'luxon';

function combine(date, time) {
    const datePart = date.split('T')[0];
    const timePart = time.split('T')[1];

    return `${datePart}T${timePart}`;
}

function toISODate(date) {
    return DateTime.fromISO(date).toISODate();
}

const datetime = {
    combine: combine,
    toISODate: toISODate
}

export { datetime }