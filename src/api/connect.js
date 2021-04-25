import axios from 'axios';

function test() {
    axios.get('https://dapapi.herokuapp.com/api/patients').then(response => console.log(response));
}

export { test }