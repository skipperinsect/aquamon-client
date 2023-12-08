import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types'

const initialState = {
  message: {
    message: '',
    status: 0,
  },
}

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: {
          message: payload.message,
          status: payload.status,
        },
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: {
          message: '',
          status: 0,
        },
      }
    default:
      return state
  }
}

export default messageReducer
