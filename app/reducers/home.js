import { SERVER_STATE_FAILED, SERVER_STATE_SUCCEED, SERVER_STATE_REQUEST } from '../actions/home'

export default (state = {}, action) => {
  switch (action.type) {
    case SERVER_STATE_REQUEST:
      return { ...state }
    case SERVER_STATE_SUCCEED:
      const _data = {
        userData: {id:"111111", username:"2", mobile:"13511118888", email:"@", county:"歪果仁" },//action.data.result,
        loaded: true
      }
      return { ...state, ..._data}
    case SERVER_STATE_FAILED:
      return { ...state, loaded: false}
    default:
      return state
  }
}
