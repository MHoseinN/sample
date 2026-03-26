import http from './http'

export const getUsersApi = async () => {
  const { data } = await http.get('/users')
  return data
}

export const getUserByIdApi = async (id) => {
  const { data } = await http.get(`/users/${id}`)
  return data
}

export const createUserApi = async (payload) => {
  const now = new Date().toISOString()
  const requestBody = {
    ...payload,
    createdAt: now,
    updatedAt: now
  }
  const { data } = await http.post('/users', requestBody)
  return data
}

export const updateUserApi = async (id, payload) => {
  const requestBody = {
    ...payload,
    updatedAt: new Date().toISOString()
  }
  const { data } = await http.patch(`/users/${id}`, requestBody)
  return data
}

export const deleteUserApi = async (id) => {
  await http.delete(`/users/${id}`)
}
