import {
  CREATE_DEVICES,
  GET_DEVICES,
  GET_DEVICES_WITH_STATUS,
  GET_LOG_WITH_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  SET_MESSAGE,
} from './types'

import { sendMessage } from './message'

import DeviceService from '../../services/device'

export const createDevice = (data) => (dispatch) => {
  return DeviceService.createDevice(data).then(
    (response) => {
      dispatch({
        type: CREATE_DEVICES,
        payload: response.data,
      })

      sendMessage('success', 'Create Device Success!')

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      sendMessage('error', message.data.message)

      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: message.data.message,
          status: message.status,
        },
      })

      return Promise.reject('Some error occurred')
    },
  )
}

export const getAllDevice = () => async (dispatch) => {
  return DeviceService.getAllDevice().then(
    (response) => {
      dispatch({
        type: GET_DEVICES,
        payload: response.data.data,
      })

      sendMessage('success', response.data.message)

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      sendMessage('error', message.data.message)

      return error
    },
  )
}

export const getAllDeviceWithStatus = () => async (dispatch) => {
  return DeviceService.getAllDeviceWithStatus().then(
    (response) => {
      dispatch({
        type: GET_DEVICES_WITH_STATUS,
        payload: response.data.data,
      })

      sendMessage('success', response.data.message)

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      sendMessage('error', message.data.message)

      return error
    },
  )
}

export const getAllLogDatas = (code, params) => async (dispatch) => {
  return DeviceService.getAllLogDatas(code, params).then(
    (response) => {
      dispatch({
        type: GET_LOG_WITH_DEVICE,
        payload: response.data,
      })

      sendMessage('success', response.data.message)

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      sendMessage('error', message.data.message)

      return error
    },
  )
}

export const deleteDevice = (code) => async (dispatch) => {
  return DeviceService.deleteDevice(code).then(
    (response) => {
      dispatch({
        type: DELETE_DEVICE,
        payload: response.data,
      })

      sendMessage('success', response.data.message)

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      sendMessage('error', message.data.message)

      return error
    },
  )
}

export const updateDevice = (code, name) => async (dispatch) => {
  return DeviceService.updateDevice(code, name).then(
    (response) => {
      dispatch({
        type: UPDATE_DEVICE,
        payload: response.data,
      })

      sendMessage('success', response.data.message)

      return Promise.resolve()
    },
    (error) => {
      const message = error.response

      sendMessage('error', message.data.message)

      return error
    },
  )
}
