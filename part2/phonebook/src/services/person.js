import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = (newPerson) => axios.post(baseUrl,newPerson)

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
const updateById = (id, newPerson) => axios.put(`${baseUrl}/${id}`,newPerson)

export default {
  getAll,
  create,
  deleteById,
  updateById
}