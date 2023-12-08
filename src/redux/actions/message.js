import { SET_MESSAGE, CLEAR_MESSAGE } from './types'
import { toast } from 'react-toastify'

export const setMessage = (message, status) => ({
  type: SET_MESSAGE,
  payload: {
    message: message,
    status: status,
  },
})

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
})

export const sendMessage = (status, message) => {
  if (status === 'success') {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  } else {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  return
}
