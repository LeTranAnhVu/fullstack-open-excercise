import axios from 'axios'
import localstorage from '../utils/localstorage'
const baseUrl = '/api/blogs'

const getTokenFromLocal =  () => localstorage.getItem('access_token')
axios.interceptors.request.use(config => {
  const token = getTokenFromLocal()
  config.headers['authorization'] = `bearer ${token}`
  console.log(config)
  return config
})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (payload) => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}


export default { getAll, create }