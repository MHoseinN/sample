import http from './http'

const makeToken = () => `mock-token-${Date.now()}`

export const loginApi = async ({ emailOrMobile, password }) => {
  const { data } = await http.get('/users')

  const user = data.find((item) => {
    const matchIdentity = item.email === emailOrMobile || item.mobile === emailOrMobile
    const matchPassword = item.password === password
    return matchIdentity && matchPassword
  })

  if (!user) {
    throw new Error('ایمیل/موبایل یا رمز عبور اشتباه است.')
  }

  return {
    token: makeToken(),
    user
  }
}

export const registerApi = async (payload) => {
  const { data: users } = await http.get('/users')
  const duplicated = users.some((item) => item.email === payload.email || item.mobile === payload.mobile)

  if (duplicated) {
    throw new Error('کاربر با این ایمیل یا موبایل از قبل وجود دارد.')
  }

  const now = new Date().toISOString()
  const requestBody = {
    ...payload,
    role: 'viewer',
    status: 'active',
    createdAt: now,
    updatedAt: now
  }

  const { data } = await http.post('/users', requestBody)

  return {
    token: makeToken(),
    user: data
  }
}

export const fetchMeApi = async (userId) => {
  const { data } = await http.get(`/users/${userId}`)
  return data
}
