import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  VERIFY_EMAIL,
} from '../actions/types'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
  ? {
      isLoggedIn: true,
      role: user.role,
      user,
    }
  : {
      isLoggedIn: false,
      role: 0,
      user: null,
    }

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        role: payload.user.role,
        user: payload.user,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case VERIFY_EMAIL:
      return state
    default:
      return state
  }
}

export default authReducer
