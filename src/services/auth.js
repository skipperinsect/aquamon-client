import Api from '../Api'

const register = (name, email, password, repassword) => {
  return Api.post('/register', {
    name,
    email,
    password,
    repassword,
  })
}

const login = (email, password) => {
  return Api.post('/login', {
    email,
    password,
  }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  })
}

const logout = () => {
  localStorage.removeItem('user')
  window.location.reload()
}

const VerifEmail = (token) => {
  return Api.post('/verif', { token })
}

const AuthService = {
  register,
  login,
  logout,
  VerifEmail,
}

export default AuthService
