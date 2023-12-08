import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  VERIFY_EMAIL,
} from './types'

import { sendMessage } from './message'

import AuthService from '../../services/auth'

export const register = (name, email, password, repassword) => (dispatch) => {
  return AuthService.register(name, email, password, repassword).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: response.data.message,
          status: response.status,
        },
      })

      sendMessage('success', response.data.message)

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      dispatch({
        type: REGISTER_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: message.data.message,
          status: message.status,
        },
      })

      sendMessage('error', message.data.message)

      return Promise.reject('Some Error')
    },
  )
}

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response },
      })

      sendMessage('success', 'Login Success!')

      return Promise.resolve()
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      })

      const message = error.response

      sendMessage('error', message.data.message)

      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: message.data.message,
          status: message.status,
        },
      })

      return Promise.reject('Some Error')
    },
  )
}

export const logout = () => (dispatch) => {
  AuthService.logout()
  dispatch({
    type: LOGOUT,
  })

  dispatch({
    type: SET_MESSAGE,
    payload: {
      message: 'LOGOUT SUCCESS',
      status: 400,
    },
  })

  return
}

export const VerifEmail = (token) => async (dispatch) => {
  return AuthService.VerifEmail(token).then(
    (response) => {
      dispatch({
        type: VERIFY_EMAIL,
      })

      sendMessage('success', response.data.message)

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      sendMessage('error', message.data.message)

      return Promise.reject('Some Error')
    },
  )
}
