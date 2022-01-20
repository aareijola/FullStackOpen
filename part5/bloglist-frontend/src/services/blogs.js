import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const destUrl = `${baseUrl}/${newObject.id}`
  const res = await axios.put(destUrl, newObject, config)
  return res.data
}

export default { getAll, setToken, create, update }