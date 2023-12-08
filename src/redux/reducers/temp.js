import { SET_SIDEBAR } from '../actions/types'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const tempReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SIDEBAR:
      return { ...state, sidebarShow: payload.sidebarShow }
    default:
      return state
  }
}

export default tempReducer
