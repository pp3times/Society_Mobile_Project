import axios from 'axios'
const BASE_URL = 'http://localhost:8080'

export default axios.create({
  baseURL: `${BASE_URL}/api/bar/all`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
