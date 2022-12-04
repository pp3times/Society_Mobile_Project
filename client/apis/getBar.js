import axios from 'axios'
const BASE_URL = 'http://45.77.255.88:8080'

export default axios.create({
  baseURL: `${BASE_URL}/api/bar/all`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
