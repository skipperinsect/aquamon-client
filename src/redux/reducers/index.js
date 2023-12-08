import { combineReducers } from 'redux'
import auth from './auth'
import temp from './temp'
import user from './user'
import message from './message'
import device from './device'

export default combineReducers({
  auth,
  user,
  temp,
  message,
  device,
})
