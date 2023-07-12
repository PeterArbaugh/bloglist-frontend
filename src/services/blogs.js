import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postSingle = ( blog, token ) => {

  const config = {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`
  }
}
  
  const request = axios.post(baseUrl, blog, config)
  console.log('blog post request', baseUrl, blog, config)
  return request.then(response => response.data)
}

const likeSingle = ( id, blog, token ) => {
  const config = {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`
    }
  }

  const blogUrl = baseUrl + '/' + id

  const request = axios.put(blogUrl, blog, config)
  console.log('blog put request')
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postSingle, likeSingle }