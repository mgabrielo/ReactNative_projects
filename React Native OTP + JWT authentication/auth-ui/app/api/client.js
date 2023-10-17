import axios from 'axios'

const client = axios.create(
    { baseUrl: 'http://112.188.1.107:8000/api/', }
)

export default client;
