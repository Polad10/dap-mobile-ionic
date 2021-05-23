function combine(date, time) {
    const datePart = date.split('T')[0];
    const timePart = time.split('T')[1];

    return `${datePart}T${timePart}`;
}

const datetime = {
    combine: combine
}

export { datetime }