import {
  CREATE_DEVICES,
  GET_DEVICES,
  GET_DEVICES_WITH_STATUS,
  GET_LOG_WITH_DEVICE,
} from '../actions/types'

const initialState = {
  deviceList: [],
  deviceStatus: [],
  logDatas: null,
}

const deviceReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CREATE_DEVICES:
      return state
    case GET_DEVICES:
      return {
        ...state,
        deviceList: payload,
      }
    case GET_DEVICES_WITH_STATUS:
      return {
        ...state,
        deviceStatus: payload,
      }
    case GET_LOG_WITH_DEVICE:
      return {
        ...state,
        logDatas: payload,
      }
    default:
      return state
  }
}

export default deviceReducer
