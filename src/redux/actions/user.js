import { FETCH_USER, SET_MESSAGE } from './types'

import UserServices from '../../services/user'

export const getUser = () => async (dispatch) => {
  return UserServices.getUser().then(
    (response) => {
      dispatch({
        type: FETCH_USER,
        payload: {
          user: response.data.data,
        },
      })

      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: response.data.message,
          status: response.status,
        },
      })

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

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
