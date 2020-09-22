import axios from 'axios'

var axiosConfig
if (process.env.NODE_ENV === 'production') {
  axiosConfig = {
    baseURL: '/api/v1/',
    timeout: 30000,
  }
} else {
  axiosConfig = {
    // baseURL: 'http://localhost/api/v1/',
    baseURL: 'https://unicrypt.network/api/v1/',
    timeout: 30000,
  }
}

const http = axios.create(axiosConfig)

export default http
