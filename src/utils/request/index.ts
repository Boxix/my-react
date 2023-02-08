import axois from 'axios'

const instance = axois.create({
  baseURL: 'http://localhost:3000/api',
})

export default instance
