import Api from '../Api'

import AuthHeader from './header'

const createDevice = (data) => {
  return Api.post('/devices', data, { headers: AuthHeader() })
}

const getAllDevice = () => {
  return Api.get('/devices', { headers: AuthHeader() })
}

const getAllDeviceWithStatus = () => {
  return Api.get('/devices/status', { headers: AuthHeader() })
}

const getAllLogDatas = (code, params) => {
  return Api.get(`/devices/log/${code}?page=${params.page}&pageSize=${params.pageSize}`, {
    headers: AuthHeader(),
  })
}

const DeviceService = {
  createDevice,
  getAllDevice,
  getAllDeviceWithStatus,
  getAllLogDatas,
}

export default DeviceService
