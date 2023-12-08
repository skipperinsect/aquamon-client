import { SET_SIDEBAR } from './types'

export const setSiteBar = (data) => (dispatch) => {
  dispatch({
    type: SET_SIDEBAR,
    payload: {
      ...data,
    },
  })
}
