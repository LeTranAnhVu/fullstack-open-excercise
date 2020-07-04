import axios from 'axios'
import localstorage from '../utils/localstorage'

const baseUrl = '/api/blogs'

const getTokenFromLocal = () => localstorage.getItem('access_token')

axios.interceptors.request.use(config => {
  const token = getTokenFromLocal()
  config.headers['authorization'] = `bearer ${token}`
  return config
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (500 === error.response.status) {
    error.response.data = {error: '* Internal error'}
    return Promise.reject(error)
  } else {
    return Promise.reject(error)
  }
})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (payload) => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

const updateById = async (id, payload) => {
  const response = await axios.put(`${baseUrl}/${id}`, payload)
  return response.data
}

const likeById = async (id) => {
  const response = await axios.patch(`${baseUrl}/${id}/like`)
  return response.data
}


export default {getAll, create, updateById, likeById}