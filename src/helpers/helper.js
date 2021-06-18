function groupBy(arr, property) {
    return arr.reduce((currentResult, value) => {
            const propertyValue = value[property];

            let foundObj = currentResult.find(r => r.date == propertyValue);

            if(!foundObj) {
                foundObj = {date: propertyValue, infos: []};
                currentResult.push(foundObj)
            }

            foundObj.infos.push(value);

            return currentResult;
        }, []);
}

function combine(firstPart, secondPart) {
    return `${firstPart} ${secondPart}`;
}

function slice(arr, startIndex, length) {
    return arr.slice(startIndex, startIndex + length);
}

const helper = {
    groupBy: groupBy,
    combine: combine,
    slice: slice
}

export { helper }