import { FETCH_USER } from '../actions/types'

const initialState = []

const userReducer = (user = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_USER:
      return (user = payload.user)
    default:
      return user
  }
}

export default userReducer
