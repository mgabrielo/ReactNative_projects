import axios from 'axios'

const client = axios.create(
    { baseUrl: 'http://192.168.1.167:8000/api/', }
)

export default client;