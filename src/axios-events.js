import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://paw-print-dae96.firebaseio.com/'
});

export default instance;
