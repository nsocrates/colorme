import { LOGIN, SIGNUP, LOGOUT } from 'constants/actionTypes'

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  errors: [],
  token: '',
  id: '',
}

export default function session(state = initialState, action) {
  switch (action.type) {
    case LOGIN.REQUEST:
    case SIGNUP.REQUEST:
      return {
        isAuthenticating: true,
        isAuthenticated: false,
        errors: [],
      }
    case LOGIN.SUCCESS:
    case SIGNUP.SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.response.token,
        id: action.response.id,
      })
    case LOGIN.FAILURE:
    case SIGNUP.FAILURE:
      return Object.assign({}, initialState, {
        errors: action.error,
      })
    case LOGOUT:
      return initialState
    default:
      return state
  }
}