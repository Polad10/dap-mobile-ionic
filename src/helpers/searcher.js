import Fuse from 'fuse.js';

function searchPatient(patients, searchName) {
    const options = {
        keys: ['first_name', 'last_name']
    }
    
    const fuse = new Fuse(patients, options);

    return fuse.search(searchName).map(r => r.item);
}

const searcher = {
    searchPatient: searchPatient
}

export { searcher }